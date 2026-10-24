# Dor de Cotovelo — Implementação do MVP v1

O que foi construído a partir da [Especificação v1.0](ESPECIFICACAO-v1.0.md), como funciona por dentro, quais critérios de aceitação têm evidência e o que ainda depende de decisão.

Regra de governança da especificação, aplicada aqui: *planejado não significa implementado; implementado não significa testado; testado não significa homologado.* Por isso cada critério abaixo tem as três colunas separadas.

---

## 1. Arquitetura

```text
Celular da pessoa
  └─ App Dor de Cotovelo (site estático na Vercel, projeto "dor-de-cotovelo")
       ├─ Meu Momento · Jornada · SOS · Mensagem que não envio · Progresso · Privacidade
       ├─ Estado completo no localStorage (chave "dor-de-cotovelo:v1"), nunca enviado a servidor
       └─ Converse com a LÚCIDA ──HTTPS──▶ Magnetus3  /api/lucida/dor
                                             ├─ origem permitida? (LUCIDA_PUBLIC_ORIGINS)
                                             ├─ entrada válida + consentimento?
                                             ├─ sinal de risco? (força postura "safety")
                                             ├─ cota e orçamento (magnetus.lucida_budget, sem conteúdo)
                                             ├─ provedor de IA (Gemini), store: false
                                             └─ validação da resposta (esquema, 1 pergunta, sem oferta)
```

| Camada | Tecnologia | Onde |
|---|---|---|
| App | Vite 7, React 19, TypeScript 5.6, wouter 3, lucide-react | este repositório |
| Hospedagem | Vercel, site estático, reescrita SPA | `vercel.json` |
| Conselheira | Next.js 16 (Magnetus3), rota `app/api/lucida/dor/route.ts` | `Sollimastudio/Magnetus3`, branch `claude/lucida-publica` |
| Instruções da conselheira | núcleo da LÚCIDA + seção "SUPERFÍCIE DOR DE COTOVELO" | `Magnetus3/lib/server/lucida-dor.ts` |

### Estrutura do código

```text
src/
  App.tsx, main.tsx, styles.css
  componentes/  Moldura (topo + SOS + abas), ApoioHumano (190/192/180/188), Campos (texto, escolha, escala)
  conteudo/     momentos, avaliacao, modulos (8), sos (situações, escolhas, indicadores), apoio (números e pontes)
  lib/          estado (localStorage), EstadoContexto, plano (ponto de partida), risco, lucida (cliente HTTP)
  paginas/      Inicio, MeuMomento, Jornada, ModuloPagina, Sos, Rascunho, Lucida, Progresso, Privacidade, NaoEncontrada
tests/logica.test.mjs   plano, risco e armazenamento
scripts/e2e.mjs         percurso completo no navegador (390×844)
```

O conteúdo (textos dos módulos, situações do SOS, perguntas) fica separado da interface, em `src/conteudo/`. Para revisar ou trocar um texto, edite apenas esses arquivos.

---

## 2. Contratos de dados

### 2.1 Estado local (`dor-de-cotovelo:v1`)

```ts
{
  versao: 1,
  guardar: boolean,                 // false: nada é gravado; tudo some ao fechar
  momento: string[],                // ids de src/conteudo/momentos.ts
  momentoTexto: string,             // o que a pessoa escreveu livremente
  avaliacao: { duracao?, dificuldade?, rotina?, repeticoes?: string[], mudanca?: string[], objetivo? },
  plano: { inicio: "sos"|"m1"|"m2"|"m4"|"m5"|"m6", porque, depois: string[], apoioProfissional, seguranca } | null,
  modulos: { [m1..m8]: { respostas: { [campo]: string | string[] | number }, concluidoEm?: ISO } },
  sos: { em: ISO, situacao, antes?: 0..10, depois?: 0..10, escolha? }[],
  rascunhos: { id, em: ISO, texto }[],
  checkins: { em: ISO, valores: { [indicador]: 1..5 } }[],
  rede: string[],                   // até 8 nomes
  lucida: { consentimento: boolean, enviarContexto: boolean, conversa: { role, content }[] }
}
```

Um estado corrompido ou de outra versão é descartado com segurança e o app recomeça vazio. Se o navegador não permitir armazenamento (modo privado restrito), o app segue funcionando só na memória.

### 2.2 Conselheira: `GET /api/lucida/dor`

Resposta: `{ available, provider, policyVersion, consent, privacy, exercises }`. O app usa `available` para dizer se a conversa está disponível agora.

### 2.3 Conselheira: `POST /api/lucida/dor`

Entrada (qualquer outra chave é recusada com 400):

```json
{
  "messages": [{ "role": "user", "content": "..." }],
  "consent": { "processing": true },
  "context": { "momento": ["idas-e-vindas"], "modulo": "m2", "objetivo": "..." }
}
```

- De 1 a 12 mensagens, a primeira e a última da pessoa; até 2.000 caracteres por mensagem dela, 4.000 por resposta anterior e 12.000 no total.
- `context` é opcional. Só vai se o interruptor "enviar meu momento" estiver ligado. `momento` usa os ids do app; `modulo` usa um dos códigos de exercício; `objetivo` tem até 300 caracteres.

Saída:

```json
{
  "message": "...", "question": "... ou null", "next_step": "... ou null",
  "stance": "reflection | respectful_challenge | practice | closure | insufficient_context | safety",
  "exercise_id": "m1..m8 | sos | rascunho | null",
  "safety": false, "mode": "ai", "policyVersion": "...", "privacy": { ... }
}
```

Erros: 400 (entrada ou consentimento), 403 (origem não permitida), 429 (cota ou intervalo), 502 (resposta do provedor recusada pela validação), 503 (IA não configurada, orçamento esgotado ou circuito aberto). Em todos os casos a mensagem continua na tela da pessoa.

### 2.4 O que a conselheira garante no servidor

- Instruções próprias para sofrimento amoroso (seção 7 da especificação), com proibições explícitas: diagnóstico, garantias sobre terceiros, vigilância, manipulação, contato zero imposto, decidir pela pessoa e oferta de produtos.
- Sinal de risco nas mensagens da pessoa força `stance: "safety"` e `exercise_id: null`, mesmo que o modelo responda outra coisa.
- A resposta só é entregue se passar pelo esquema estrito: no máximo uma pergunta, exercício dentro da lista, limites de tamanho e nenhuma oferta não aprovada.
- `store: false` no provedor. O banco guarda só o registro técnico de custo, sem texto, num balde diário com hash.
- Cota: cinco envios por conexão por dia UTC, num balde próprio do Dor de Cotovelo, separado da vitrine; intervalo mínimo de cinco segundos; orçamento global diário e mensal; pausa automática após cinco falhas em dez minutos.

---

## 3. Melhorias em relação à especificação

| Melhoria | Por quê |
|---|---|
| **Termômetro da urgência** antes e depois da pausa do SOS, com a queda mostrada na hora e a média no Progresso. | Torna visível que o impulso baixa quando não é alimentado. Esse é o aprendizado central do produto. |
| **Mensagem que não envio** como área própria, ligada ao SOS e à LÚCIDA. | Dá vazão ao impulso sem consequência. É a escolha mais útil no pico da vontade de escrever. |
| **Pausa de respiração de 1 a 3 minutos**, com animação suave e respeito a "reduzir movimento". | A especificação pede uma pausa sem obrigar; a duração curta e opcional diminui o abandono. |
| **Rede de apoio** com até oito nomes, lembrada no SOS e no Progresso. | Transforma "procure alguém de confiança" em algo concreto no momento difícil. |
| **Frase-âncora** no módulo 8, exibida no plano. | Um recurso curto para reler na recaída, alinhado a "sentir saudade de novo não é perder o progresso". |
| **Interruptor de contexto** para a LÚCIDA. | Memória transparente e limitada (seção 7.3): a pessoa decide se a conselheira sabe do momento, do módulo e do objetivo. |
| **CVV 188** junto de 190, 192 e 180. | A especificação pede apoio humano em risco de autoagressão; o 188 é o canal específico para isso. |
| **Dados só no aparelho**, com exportar e apagar. | Privacidade desde a arquitetura (seção 11), sem conta e sem servidor de dados no MVP. |
| **Números de emergência no `index.html`**, visíveis mesmo sem JavaScript. | Falha técnica nunca esconde o caminho para a ajuda. |
| **Pontes do ecossistema** apenas na tela inicial. | Mantém o produto ligado à vitrine sem nenhuma oferta perto de sofrimento intenso. |
| **Sem notificações, prazos, sequências ou contagens regressivas.** | Seção 9: nada de mecanismos que criem dependência ou ruminação. |
| **`noindex`** no site e no `robots.txt`. | Enquanto não houver homologação e decisão comercial, o app não aparece em buscadores. |

---

## 4. Critérios de aceitação (seção 13)

Legenda: ✅ com evidência · ⏳ pendente.
"Testado" cita a evidência: **U** = teste unitário (`npm test`), **E** = percurso no navegador (`scripts/e2e.mjs`), **S** = teste do servidor no Magnetus3 (`npm run test:lucida:public`), **P** = verificação em produção.

| Área | Critério | Implementado | Testado | Homologado |
|---|---|---|---|---|
| Jornada | Iniciar a jornada | ✅ | ✅ E | ⏳ |
| Jornada | Escolher o contexto | ✅ | ✅ E | ⏳ |
| Jornada | Realizar um exercício | ✅ | ✅ E | ⏳ |
| Jornada | Respostas processadas conforme o especificado (ponto de partida) | ✅ | ✅ U, E | ⏳ |
| Jornada | Continuar após sair e voltar | ✅ | ✅ U, E (recarregar a página mantém as respostas) | ⏳ |
| SOS | Acesso em todas as áreas | ✅ | ✅ E (botão no topo de todas as telas) | ⏳ |
| SOS | Identificar o gatilho e escolher uma ação | ✅ | ✅ E | ⏳ |
| SOS | Situações de risco seguem o fluxo de segurança | ✅ | ✅ U (detecção), E (tela com 180 e 188), S (postura forçada) | ⏳ |
| SOS | Falha de conexão não simula atendimento | ✅ | ✅ E (o SOS não depende de rede; o erro da LÚCIDA aparece como alerta) | ⏳ |
| LÚCIDA | Responde de acordo com o contexto recebido | ✅ | ✅ S (contexto chega ao provedor), P | ⏳ |
| LÚCIDA | Reconhece falta de informação | ✅ (instruções + postura `insufficient_context` no esquema) | ⏳ precisa de avaliação humana com conversas reais | ⏳ |
| LÚCIDA | Não apresenta hipóteses sobre terceiros como fatos | ✅ (instruções) | ⏳ precisa de avaliação humana com conversas reais | ⏳ |
| LÚCIDA | Não incentiva vigilância, perseguição ou manipulação | ✅ (instruções + verificação de oferta) | ⏳ idem | ⏳ |
| LÚCIDA | Encaminha risco para apoio humano | ✅ | ✅ S, P | ⏳ |
| LÚCIDA | Lida com indisponibilidade e erros | ✅ | ✅ S (502/503/429), E (alerta, mensagem preservada) | ⏳ |
| Progresso | Indicadores explicados | ✅ | ✅ E | ⏳ |
| Progresso | Registros correspondem às respostas | ✅ | ✅ U, E | ⏳ |
| Progresso | Pode pular etapas não obrigatórias | ✅ | ✅ E (avaliação e pausa puláveis) | ⏳ |
| Progresso | Sem alegações de cura ou diagnóstico | ✅ | ✅ U (texto do plano), revisão dos textos | ⏳ |
| Privacidade | Acesso aos registros respeita permissões | ✅ (só o próprio aparelho) | ✅ U | ⏳ |
| Privacidade | Exclusão funciona | ✅ | ✅ U, E | ⏳ |
| Privacidade | Dados não expostos por rotas indevidas | ✅ (não há rota de dados; endpoint só aceita origens declaradas) | ✅ S (403 sem origem válida) | ⏳ |
| Privacidade | Provedores externos informados | ✅ (Google Gemini, na LÚCIDA e na Privacidade) | ✅ E | ⏳ |

Os critérios marcados ⏳ em "Testado" dependem de julgamento humano sobre conversas reais. A seção 6 traz o roteiro para isso.

---

## 5. Como rodar e verificar

```bash
npm install
npm run dev            # http://localhost:5173
npm test               # testes de lógica (plano, risco, armazenamento)
npm run build          # checagem de tipos + build de produção em dist/
npm run preview -- --port 5300 &
node scripts/e2e.mjs capturas   # percurso completo no celular, com capturas de tela
```

Variável opcional: `VITE_LUCIDA_URL` aponta o app para outro endereço da conselheira (por exemplo, uma prévia do Magnetus3).

### Publicação

- **App:** projeto Vercel `dor-de-cotovelo`, ligado a este repositório. Cada push gera uma prévia, e a produção é publicada a partir da branch aprovada.
- **Conselheira:** a origem de produção do app precisa estar em `LUCIDA_PUBLIC_ORIGINS` no projeto `relacionese-magnetus-m1` (lista separada por vírgula, origens exatas). Sem isso, o endpoint responde 403 e o app mostra que a conversa está indisponível.
- **Proteção:** enquanto não houver homologação, o site responde com `noindex`. O acesso é público para quem tiver o link, ou protegido pela Vercel, conforme a decisão de lançamento.

---

## 6. Homologação (Fase 5): roteiro sugerido

1. Abrir no celular (iPhone e Android) e percorrer os três roteiros do [Manual](MANUAL-DO-PRODUTO.md#3-como-a-pessoa-usa-roteiros-típicos).
2. Ler todos os textos de `src/conteudo/` e aprovar ou ajustar o tom.
3. Conversar com a LÚCIDA em pelo menos dez cenas reais (término, sem resposta, idas e vindas, ciúme de publicação, vontade de voltar, um relato com ameaça). Para cada uma, conferir: separou fato de suposição? Fez no máximo uma pergunta? Evitou garantir o que o outro sente? A cena de ameaça foi para a segurança?
4. Testar "Apagar tudo", "Baixar uma cópia" e o interruptor "Guardar meus dados".
5. Registrar o resultado e a decisão de liberação neste documento.

---

## 7. Limitações conhecidas

- **Sem sincronização entre aparelhos e sem conta.** Trocar de celular ou limpar o navegador apaga o progresso, a não ser que a pessoa tenha baixado a cópia. Não existe importação da cópia nesta versão.
- **Cota da LÚCIDA:** cinco mensagens por conexão por dia. Pessoas na mesma rede (por exemplo, wi-fi de empresa) dividem a cota.
- **Detecção de risco por palavras.** Ela cobre formas comuns em português, mas não entende tudo. Por isso a pergunta "você está em perigo agora?" abre o SOS, e a conselheira também é instruída a reconhecer risco pelo sentido.
- **A conselheira não tem memória entre conversas.** O histórico mostrado fica no aparelho e é reenviado (últimas 12 mensagens) a cada envio.

---

## 8. Decisões pendentes (seção 17)

| Decisão | Situação nesta versão |
|---|---|
| Nome e posicionamento comerciais | "Dor de Cotovelo, por Sol Lima", provisório. |
| Modelo de acesso | Gratuito, como isca da vitrine. Pode virar bônus de produto ou versão paga com a jornada completa. |
| Conteúdo integral dos exercícios | Escrito e pronto para a revisão editorial de Sol. |
| Retenção e exclusão | Dados no aparelho; servidor guarda só o registro técnico, excluído a partir de 32 dias. |
| Provedor e orçamento de IA | Gemini, dentro do teto atual da LÚCIDA pública. Se o uso crescer, aumentar a cota por pessoa ou o teto mensal. |
| Autenticação com o Magnetus3 | Não usada. Só faz sentido se o app virar parte da área de alunos. |
| Critérios de avaliação do MVP | Sugestão: percentual de quem conclui o primeiro módulo, uso do SOS com queda da urgência e retorno em sete dias. Medir sem coletar conteúdo exige decidir sobre analytics anônimo. |
| Responsáveis pela aprovação | Sol (editorial); técnica e segurança a definir. |
