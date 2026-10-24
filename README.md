# Dor de Cotovelo

App de apoio para quem está sofrendo por alguém: término, rejeição, paixão não correspondida, dependência emocional percebida ou idas e vindas. Ecossistema Relacione-se, por Sol Lima.

> A dor merece acolhimento, mas não precisa comandar as decisões.

O app não promete reconciliação, não ensina a reconquistar e não diagnostica. Ele ajuda a pessoa a recuperar autonomia, discernimento e capacidade de escolha.

## O que tem dentro

- **Meu Momento:** o que está doendo, cinco perguntas curtas e um ponto de partida explicado.
- **Minha Jornada:** oito módulos com exercícios, no ritmo da pessoa, sem prazo.
- **SOS Emocional:** para os minutos de impulso, com triagem de perigo, acolhida, termômetro da urgência, pausa de respiração e uma escolha pequena e segura.
- **Mensagem que não envio:** escrever tudo sem mandar.
- **Converse com a LÚCIDA:** conselheira de IA que separa fato, interpretação e esperança. Exige consentimento e não faz ofertas.
- **Meu Progresso:** percepções registradas pela própria pessoa, sem nota de cura, e o plano para os dias difíceis.
- **Privacidade:** tudo fica só no aparelho, com opções de não guardar, baixar uma cópia ou apagar tudo.

## Documentação

| Documento | Para quê |
|---|---|
| [docs/MANUAL-DO-PRODUTO.md](docs/MANUAL-DO-PRODUTO.md) | Para que serve, como cada área funciona, como a pessoa usa e como apresentar. |
| [docs/IMPLEMENTACAO-MVP-v1.md](docs/IMPLEMENTACAO-MVP-v1.md) | Arquitetura, contratos de dados, conselheira, critérios de aceitação com evidências, limitações e decisões pendentes. |
| [docs/AUDITORIA-FASE-0.md](docs/AUDITORIA-FASE-0.md) | O que existia antes, o que faltava e as decisões técnicas que vieram daí. |
| [docs/ESPECIFICACAO-v1.0.md](docs/ESPECIFICACAO-v1.0.md) | Especificação funcional original. |
| [docs/historico-funil-mapa-da-suspeita/](docs/historico-funil-mapa-da-suspeita/) | Estratégia anterior deste repositório: o funil "Mapa da Suspeita", que hoje vive na vitrine como ferramenta gratuita. |

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm test         # testes de lógica
npm run build    # tipos + build de produção (dist/)
```

Percurso completo no navegador: `npm run preview -- --port 5300` e, em outro terminal, `node scripts/e2e.mjs capturas`.

A conselheira roda no Magnetus3 (`/api/lucida/dor`). Para apontar o app para outro endereço, use `VITE_LUCIDA_URL`.

## Status

- [x] Auditoria (Fase 0)
- [x] Fundação: arquitetura, contratos e instruções da conselheira
- [x] Jornada: momento, avaliação, plano e oito módulos
- [x] LÚCIDA conselheira integrada, com segurança, limites e tratamento de erros
- [x] SOS, rascunhos e progresso
- [x] Testes unitários, do servidor e de ponta a ponta
- [ ] Homologação em celulares e revisão editorial (Sol)
- [ ] Decisões comerciais: nome, modelo de acesso e domínio
