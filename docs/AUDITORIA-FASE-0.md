# Dor de Cotovelo — Auditoria Fase 0

Data: outubro de 2026
Escopo: repositório `Sollimastudio/dor-de-cotovelo`, os vínculos dele com o Magnetus3 (LÚCIDA) e a vitrine `relacionese-website`, além da hospedagem na Vercel.
Referência: [ESPECIFICACAO-v1.0.md](ESPECIFICACAO-v1.0.md), seção 18.

A auditoria foi feita antes de escrever código. Ela separa, como a especificação pede, o que existe e foi comprovado, o que existe em parte, o que foi planejado e não estava implementado, o que não pôde ser verificado e o que precisava ser construído.

## 1. O que existia e foi comprovado

| Item | Evidência |
|---|---|
| Repositório `dor-de-cotovelo` com um único commit (`1d0e4d1`, "docs: adiciona plano técnico de implementação"). | `git log` |
| Quatro documentos de estratégia de um funil pago de R$ 9,90 ("Mapa da Suspeita™"): projeto-mestre, MVP do teste pago, criativos-piloto e plano de implementação. | Arquivos em `docs/`, hoje movidos para `docs/historico-funil-mapa-da-suspeita/`. |
| O teste "Mapa da Suspeita" já existe como ferramenta da vitrine, com página e carrossel. | `relacionese-website`, rota `/gratis/mapa-da-suspeita` e `client/public/gratis/`. |
| A LÚCIDA pública está no ar no Magnetus3 (Next.js 16), com provedor Gemini, orçamento em banco (`magnetus.lucida_budget`), limite de cinco envios por conexão por dia (UTC), intervalo mínimo de cinco segundos e CORS restrito a origens declaradas (`BETTER_AUTH_URL` + `LUCIDA_PUBLIC_ORIGINS`). | `lib/server/lucida-public.ts`, `lib/server/lucida-budget.ts`, `lib/server/lucida-fetch.ts`; testes `test:lucida:public`; verificação externa registrada em `Magnetus3/docs/09-execucao/LUCIDA-UNICA-PUBLICA-2026-10-13.md`. |
| Sistema visual Relacione-se (tons rosa-cinza e vinho, Cormorant Garamond e Manrope), já usado nas ferramentas gratuitas. | `relacionese-website/client/src/redesign.css`. |
| Números de apoio no Brasil: 190 (polícia), 192 (SAMU), 180 (Central de Atendimento à Mulher) e 188 (CVV). | Usados no app, no `index.html` (mesmo sem JavaScript) e nas instruções da conselheira. |

## 2. O que existia em parte

| Item | Situação encontrada |
|---|---|
| Uma "Dor de Cotovelo" na vitrine. | Card na página `/gratis` com selo "em breve", sem produto por trás. |
| Autenticação no Magnetus3 (Better Auth). | Existe para alunos dos produtos pagos. Não serve para um app gratuito de acesso imediato sem obrigar a pessoa a criar conta. |
| Memória da LÚCIDA. | A LÚCIDA pública não tem memória entre conversas. Ela só conhece o que a página envia a cada turno. |

## 3. O que foi planejado e não estava implementado

- Nenhuma das cinco áreas da especificação (Meu Momento, Minha Jornada, SOS Emocional, Converse com a LÚCIDA, Meu Progresso) existia como tela ou serviço.
- Não havia conteúdo escrito para os oito módulos.
- Não havia instruções de conselheira para o contexto de sofrimento amoroso: a LÚCIDA pública é voltada a orientação e oferta de produtos.
- Não havia projeto na Vercel, domínio, variáveis de ambiente nem testes.

## 4. O que não foi possível verificar

- Login compartilhado entre o Dor de Cotovelo e o Magnetus3: não existe, e a especificação proíbe presumi-lo (seção 10).
- Sincronização de progresso entre aparelhos: não existe.
- Disponibilidade contínua da conselheira: depende do provedor de IA e do orçamento mensal. Por isso o app foi construído para funcionar inteiro sem ela.

## 5. Decisões técnicas tomadas a partir da auditoria

1. **App separado e leve.** Vite + React 19 + TypeScript + wouter, publicado como site estático. Não duplica o Magnetus3 e não precisa de banco próprio.
2. **Dados só no aparelho.** O estado completo fica no `localStorage` do navegador (chave `dor-de-cotovelo:v1`), sem conta e sem servidor de dados. Essa é a forma mais simples de cumprir a seção 11 (coletar só o necessário, restringir acesso, excluir de verdade) num MVP gratuito. A pessoa pode desligar o armazenamento, baixar uma cópia ou apagar tudo.
3. **A LÚCIDA reaproveita a infraestrutura que já está protegida.** Foi criado um endpoint próprio no Magnetus3, `/api/lucida/dor`, com instruções de conselheira escritas para este produto. Ele usa o mesmo provedor, o mesmo orçamento global, a mesma verificação de origem e a mesma validação das respostas. Não foi preciso criar nenhum segredo novo.
4. **Nada de memória presumida.** A conselheira recebe apenas as mensagens da conversa atual e, se a pessoa permitir, o momento escolhido, o módulo em que está e o objetivo escrito. Ela é instruída a não dizer que lembra de mais nada.
5. **Segurança em duas camadas.** O app detecta sinais de risco no texto da própria pessoa e abre a tela de segurança. O servidor detecta os mesmos sinais e força a postura `safety`, que bloqueia sugestões de exercício comuns.

## 6. Riscos identificados

| Risco | Tratamento |
|---|---|
| Aparelho compartilhado expõe relatos íntimos. | Aviso na página de privacidade, opção de não guardar nada e botão "Apagar tudo". |
| Custo de IA sem controle. | Cota diária por conexão, intervalo mínimo, orçamento diário e mensal no banco, circuito que pausa a conversa após falhas seguidas. |
| A IA dizer algo fora dos limites. | Instruções proibitivas explícitas, saída em JSON com esquema estrito, no máximo uma pergunta por resposta, verificação de ofertas não aprovadas e recusa da resposta (erro 502) quando algo não passa. |
| Falha de conexão simular que um pedido de ajuda foi atendido. | O SOS e a tela de segurança funcionam sem internet. Quando a LÚCIDA falha, a mensagem continua na tela e o erro é dito com clareza. |
| O app virar ruminação sobre a outra pessoa. | Sem notificações, sem contagens regressivas, sem sequência de dias e sem "perder o progresso". Os exercícios sempre voltam o foco para a própria pessoa. |
