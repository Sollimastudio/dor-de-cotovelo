# Implementação do MVP

## 1. Objetivo técnico

Entregar um fluxo mobile-first em que a usuária:

1. abre a landing page;
2. inicia o quiz;
3. responde 9 perguntas;
4. recebe uma prévia bloqueada;
5. paga R$ 9,90;
6. retorna ao resultado completo correto;
7. pode salvar ou receber o resultado.

## 2. Páginas necessárias

### `/`

Landing page curta com headline, subheadline, benefícios, aviso e CTA.

### `/teste`

Quiz de uma pergunta por tela.

### `/resultado-previa`

Prévia calculada, com partes ocultas e botão de pagamento.

### `/checkout`

Checkout ou redirecionamento para plataforma de pagamento.

### `/resultado/[token]`

Resultado liberado após pagamento.

### `/obrigada`

Confirmação de compra e acesso ao resultado.

### `/privacidade`

Política de privacidade e tratamento de dados.

### `/termos`

Termos de uso e limites do teste.

## 3. Dados mínimos

Guardar somente:

- identificador anônimo da sessão;
- respostas numéricas;
- classificação calculada;
- status de pagamento;
- e-mail apenas se necessário para entrega;
- UTMs;
- timestamps;
- consentimento.

Não solicitar nome do parceiro, telefone, senha, localização ou conteúdo privado.

## 4. Modelo de dados sugerido

### `quiz_sessions`

- `id`
- `anonymous_token`
- `answers_json`
- `coherence_score`
- `overload_score`
- `safety_flag`
- `result_type`
- `email`
- `payment_status`
- `created_at`
- `updated_at`
- `utm_source`
- `utm_campaign`
- `utm_content`

### `payments`

- `id`
- `quiz_session_id`
- `provider`
- `provider_transaction_id`
- `amount`
- `status`
- `created_at`

## 5. Lógica de cálculo

```text
coherence_score = Q1 + Q2 + Q3 + Q4 + Q5
overload_score = Q6 + Q7 + Q8
safety_flag = Q9 == “medo real”
```

Classificação:

```text
0–3  → nevoa_da_duvida
4–7  → sinais_dispersos
8–10 → padrao_de_incoerencias
```

Modificadores:

```text
overload_score >= 4 → sobrecarga_elevada
safety_flag == true → prioridade_seguranca
```

## 6. Pagamento

O pagamento precisa retornar ao sistema por webhook.

Fluxo:

```text
Usuária clica em pagar
↓
Sistema cria cobrança vinculada à sessão
↓
Provedor processa Pix ou cartão
↓
Webhook confirma pagamento
↓
Sistema altera payment_status para paid
↓
Resultado completo é liberado
```

Nunca liberar apenas por parâmetro visível na URL.

## 7. Requisitos do quiz

- uma pergunta por tela;
- botão grande;
- barra de progresso;
- possibilidade de voltar;
- respostas salvas a cada etapa;
- carregamento rápido;
- textos legíveis sem zoom;
- suporte a abandono e retomada;
- cálculo no servidor ou validação segura no backend.

## 8. Tela de prévia

Mostrar o suficiente para provar personalização, mas sem entregar o resultado inteiro.

Exemplo:

```text
Resultado calculado

Padrão principal: ●●●●●●●●
Nível de sobrecarga: elevado
Próximo passo recomendado: bloqueado

Libere a leitura completa por R$ 9,90
```

A prévia não deve inventar urgência nem usar contador falso.

## 9. Resultado completo

Montar com blocos dinâmicos:

- `headline_resultado`
- `explicacao_padrao`
- `leitura_sobrecarga`
- `respostas_relevantes`
- `riscos_impulso`
- `proximos_passos`
- `aviso_limites`
- `mensagem_seguranca`

## 10. Eventos de analytics

- `landing_view`
- `quiz_start`
- `quiz_question_answered`
- `quiz_complete`
- `result_preview_view`
- `unlock_click`
- `checkout_start`
- `payment_approved`
- `result_view`
- `result_saved`
- `feedback_submitted`

Parâmetros úteis:

- origem;
- campanha;
- criativo;
- resultado;
- dispositivo;
- tempo de conclusão.

## 11. Dashboard mínimo

Acompanhar diariamente:

- visitas;
- taxa de início;
- taxa de conclusão;
- clique para desbloquear;
- checkout iniciado;
- compra aprovada;
- receita;
- custo por compra;
- taxa de reembolso;
- resposta de satisfação.

## 12. Plano de execução

### Fase 1 — conteúdo

- revisar perguntas;
- revisar todos os resultados;
- criar aviso legal;
- criar política de privacidade;
- aprovar a copy da landing.

### Fase 2 — frontend

- landing;
- componente de quiz;
- progresso;
- prévia bloqueada;
- resultado completo;
- responsividade.

### Fase 3 — backend

- sessão anônima;
- persistência de respostas;
- cálculo;
- criação da cobrança;
- webhook;
- liberação segura.

### Fase 4 — mensuração

- pixel;
- eventos;
- UTMs;
- dashboard;
- testes de ponta a ponta.

### Fase 5 — aquisição

- subir 3 criativos iniciais;
- usar orçamento pequeno;
- validar conclusão do quiz;
- validar clique para desbloqueio;
- validar compra.

## 13. Ordem dos testes

1. Testar headline.
2. Testar primeiro gancho do criativo.
3. Testar prévia do resultado.
4. Testar CTA do pagamento.
5. Testar preço somente depois de haver tráfego suficiente.

Nunca alterar todas as partes ao mesmo tempo.

## 14. Critérios de qualidade

- nenhuma promessa de confirmação de traição;
- nenhum resultado genérico de duas linhas;
- pagamento sempre vinculado à sessão correta;
- resultado disponível após confirmação;
- segurança priorizada quando necessário;
- dados mínimos e protegidos;
- experiência completa em celular.

## 15. Backlog futuro

- PDF automático do resultado;
- envio por WhatsApp autorizado;
- lista de espera do produto de 72 horas;
- order bump com roteiro de conversa;
- painel administrativo;
- testes A/B;
- biblioteca de criativos;
- produto de aprofundamento.
