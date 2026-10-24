<!-- Texto original da especificação entregue por Sol Lima em outubro de 2026, guardado sem alterações de conteúdo.
     O que foi construído a partir dela está em IMPLEMENTACAO-MVP-v1.md. -->

DOR DE COTOVELO

Especificação Funcional do Produto — v1.0

Ecossistema: Relacione-se / Magnetus3
Inteligência conversacional planejada: LÚCIDA
Status: Especificação proposta — implementação não verificada
Objetivo desta versão: definir o que o produto deve fazer, como deve funcionar e como comprovar que está pronto.

⸻

1. Visão do produto

O Dor de Cotovelo é uma experiência digital de apoio ao sofrimento amoroso, composta por uma jornada estruturada de recuperação emocional e uma conselheira de inteligência artificial disponível para ajudar o usuário a refletir sobre situações concretas.

O produto atende pessoas que estão sofrendo por alguém, independentemente de terem vivido um relacionamento formal.

O foco não é fazer alguém esquecer outra pessoa à força, garantir uma reconciliação ou ensinar estratégias para conquistar quem não corresponde. O foco é ajudar o usuário a recuperar autonomia, discernimento e capacidade de escolha.

1.1. Problema que resolve

O sofrimento amoroso pode desencadear comportamentos como:

* Procurar repetidamente alguém que não corresponde.
* Interpretar mensagens, curtidas e silêncios como sinais de esperança.
* Sentir necessidade constante de confirmação ou atenção.
* Alternar entre afastamento e reconciliação sem resolver o problema.
* Abandonar a própria rotina, os interesses e os limites.
* Confundir saudade, atração, esperança, compatibilidade e reciprocidade.
* Saber racionalmente que uma situação faz mal, mas ter dificuldade para agir de acordo com esse conhecimento.

O produto deve ajudar a pessoa a compreender esses padrões e escolher ações mais conscientes.

1.2. Princípio central

A dor merece acolhimento, mas não precisa comandar as decisões.

O produto não culpabiliza quem sofre, não romantiza a insistência e não transforma toda dificuldade amorosa em diagnóstico psicológico.

2. Público e situações atendidas

O sistema deverá reconhecer cinco contextos principais.

A. Término de relacionamento

Para quem enfrenta saudade, luto pelo vínculo, dificuldade de adaptação, esperança de retorno ou vontade de procurar o ex-parceiro.

B. Rejeição

Para quem foi rejeitado, não recebeu a resposta esperada ou tem dificuldade de aceitar a falta de reciprocidade.

C. Paixão não correspondida

Para quem alimenta sentimentos por alguém que não demonstra interesse equivalente, inclusive em relações que nunca chegaram a existir de fato.

D. Dependência emocional percebida

Para quem sente que sua estabilidade, autoestima ou capacidade de funcionar depende excessivamente da presença, atenção ou aprovação de outra pessoa.

O sistema não deverá diagnosticar dependência emocional. Deverá trabalhar com comportamentos relatados, necessidades percebidas e possibilidades de mudança.

E. Relações de idas e vindas

Para quem vive ciclos de aproximação, afastamento, promessas, conflitos e reconciliações.

O sistema deverá considerar a história relatada, a consistência dos comportamentos e a segurança do usuário, sem presumir que todo afastamento é manipulação ou que toda reconciliação é saudável.

3. Arquitetura funcional

O produto deverá ter cinco áreas principais.

1. Meu Momento: entrada, identificação da situação e avaliação inicial das necessidades.
2. Minha Jornada: percurso guiado com módulos e exercícios.
3. SOS Emocional: recurso de apoio para momentos de impulso ou sofrimento intenso.
4. Converse com a LÚCIDA: conselheira de IA contextualizada.
5. Meu Progresso: acompanhamento das mudanças, aprendizados e ações realizadas.

Essas áreas são componentes propostos. A existência de telas, serviços, banco de dados ou integrações correspondentes deverá ser verificada antes do desenvolvimento.

4. Fluxo principal do usuário

Etapa 1 — Entrada

O usuário acessa o produto e encontra uma apresentação simples, sem promessas de cura, resultados instantâneos ou reconquista garantida.

Mensagem de referência:

“Você não precisa resolver toda a sua vida amorosa hoje. Vamos entender o que está acontecendo, cuidar do que você está sentindo e descobrir qual é o próximo passo mais consciente.”

A interface deverá apresentar:

* A finalidade do produto.
* O que a jornada oferece.
* A função da conselheira de IA.
* Os limites do apoio digital.
* As condições de privacidade e tratamento de dados.

Etapa 2 — Identificação do momento

O usuário escolhe a situação que melhor representa seu momento atual.

Pergunta principal:

“O que está doendo mais em você agora?”

Possíveis respostas:

* A pessoa foi embora.
* A pessoa não me corresponde.
* Não consigo parar de pensar nela.
* Continuamos juntos, mas vivo inseguro ou sofrendo.
* Terminamos e voltamos várias vezes.
* Sinto que perdi a mim mesmo nessa história.
* Não sei exatamente o que estou sentindo.

O usuário poderá selecionar mais de uma opção ou escrever livremente.

Etapa 3 — Avaliação inicial

O sistema apresenta perguntas curtas para compreender:

* Há quanto tempo a situação está acontecendo.
* Qual é a principal dificuldade no momento.
* Como o sofrimento interfere na rotina.
* Quais comportamentos estão se repetindo.
* Que tipo de mudança a pessoa deseja alcançar.

A avaliação deverá ser progressiva, sem obrigar o usuário a responder a um questionário longo de uma só vez.

Etapa 4 — Plano inicial

Com base nas respostas, o sistema recomenda um ponto de entrada na jornada.

Exemplos:

* Impulso de mandar mensagem: iniciar pelo SOS Emocional.
* Dificuldade de aceitar o término: começar pelo reconhecimento da perda.
* Relação ambígua: começar pela distinção entre fatos, interpretações e expectativas.
* Abandono da própria rotina: começar pela recuperação de autonomia.
* Sofrimento persistente ou intenso: oferecer apoio prático e, quando indicado, recomendar ajuda profissional.

O sistema não deverá apresentar esse resultado como diagnóstico clínico.

Etapa 5 — Acompanhamento

O usuário poderá continuar a jornada, conversar com a LÚCIDA ou acessar o SOS a qualquer momento.

O progresso deverá ser registrado apenas conforme as capacidades efetivamente implementadas, com informações claras sobre o que é salvo e como o usuário pode solicitar sua exclusão.

⸻

5. Jornada guiada de recuperação emocional

A proposta inicial é organizar a jornada em oito módulos. O número de dias não deverá ser imposto como prazo para superar o sofrimento.

Módulo 1 — O que está acontecendo comigo?

Objetivo: identificar emoções, acontecimentos e necessidades atuais.

Atividades:

* Nomear a emoção predominante.
* Descrever o acontecimento que a desencadeou.
* Identificar pensamentos recorrentes.
* Reconhecer o que está sob controle e o que não está.

Resultado esperado: o usuário consegue descrever melhor sua experiência sem precisar encontrar imediatamente uma solução definitiva.

Módulo 2 — Fato, interpretação e esperança

Objetivo: reduzir a confusão entre o que aconteceu e o significado atribuído ao acontecimento.

Exercício de três campos:

1. O que aconteceu de forma observável?
2. O que estou interpretando?
3. O que desejo que seja verdade?

Exemplo:

Fato: a pessoa não respondeu à mensagem.

Interpretação: “Ela está fazendo isso para me testar.”

Esperança: “Talvez esteja esperando que eu insista.”

O sistema deverá ajudar o usuário a perceber que essas hipóteses não são fatos comprovados.

Resultado esperado: maior capacidade de avaliar situações sem tratar suposições como certezas.

Módulo 3 — O ciclo que me prende

Objetivo: reconhecer padrões de comportamento que prolongam o sofrimento.

Possíveis elementos:

* Sentir ansiedade.
* Procurar sinais nas redes sociais.
* Enviar mensagens para obter alívio.
* Receber ou não uma resposta.
* Experimentar alívio temporário ou nova frustração.
* Repetir o comportamento.

O exercício deverá mapear a experiência individual do usuário, sem afirmar que todas as pessoas seguem o mesmo ciclo.

Resultado esperado: identificar gatilhos e alternativas de resposta.

Módulo 4 — Limites, reciprocidade e realidade

Objetivo: avaliar o vínculo a partir de comportamentos observáveis, necessidades e limites.

Questões orientadoras:

* Existe reciprocidade consistente?
* Posso expressar minhas necessidades sem medo?
* Há respeito aos meus limites?
* As atitudes correspondem às promessas?
* O vínculo é seguro para mim?
* O que precisaria mudar para que essa relação fosse viável?

O sistema não decidirá pelo usuário se ele deve terminar ou continuar uma relação. Deverá ajudá-lo a examinar as evidências e considerar sua segurança.

Resultado esperado: uma visão mais clara das condições reais do vínculo.

Módulo 5 — Recuperar o próprio eixo

Objetivo: reconstruir a vida para além da situação amorosa.

Atividades possíveis:

* Retomar uma atividade pessoal.
* Restabelecer contato com pessoas de confiança.
* Organizar sono, alimentação e rotina.
* Recuperar interesses abandonados.
* Definir um compromisso pequeno e realista para o dia.

Resultado esperado: recuperar espaços de autonomia sem exigir que a pessoa já esteja emocionalmente bem.

Módulo 6 — Impulso não é ordem

Objetivo: criar espaço entre sentir vontade e agir.

Atividades:

* Identificar o gatilho.
* Nomear a urgência.
* Fazer uma pausa consciente.
* Examinar as consequências possíveis.
* Escolher entre agir, esperar ou não agir.
* Rever a decisão quando estiver mais regulado emocionalmente.

O produto não deverá impor uma regra universal de bloqueio, silêncio ou ausência de contato. A estratégia deverá considerar o contexto, os limites existentes e a segurança.

Resultado esperado: aumentar a capacidade de fazer escolhas deliberadas.

Módulo 7 — Autonomia e padrões relacionais

Objetivo: compreender necessidades, limites e padrões que a pessoa deseja modificar.

Atividades:

* Identificar necessidades legítimas.
* Distinguir necessidade de aprovação de compatibilidade.
* Reconhecer concessões que ultrapassaram os próprios limites.
* Formular critérios para relações futuras.
* Elaborar acordos pessoais de comportamento.

O conteúdo não deverá atribuir a culpa pelo comportamento alheio ao usuário nem sugerir que ele é responsável por consertar a outra pessoa.

Resultado esperado: maior clareza sobre o que deseja construir e o que não deseja repetir.

Módulo 8 — Continuidade e prevenção de recaídas

Objetivo: consolidar aprendizados e preparar o usuário para momentos difíceis.

O usuário deverá produzir um plano pessoal com:

* Meus principais gatilhos.
* O que aprendi sobre mim.
* O que faço quando sinto vontade de repetir um padrão.
* Pessoas e recursos que podem me apoiar.
* Limites que desejo preservar.
* Próximas ações concretas.

O encerramento deverá reforçar que sentir saudade ou tristeza novamente não significa perder todo o progresso.

Resultado esperado: um plano de continuidade adaptado à realidade do usuário.

⸻

6. SOS Emocional

O SOS deverá ser uma função acessível a partir de qualquer área do produto.

Objetivo

Ajudar o usuário a atravessar um momento de impulso, ansiedade ou sofrimento sem tomar decisões precipitadas.

Fluxo proposto

1. Identificar: “O que aconteceu agora?”
2. Acolher: reconhecer o sentimento sem dramatizar nem minimizar.
3. Pausar: oferecer uma técnica breve de respiração ou atenção ao presente, sem obrigar o usuário a realizá-la.
4. Esclarecer: perguntar o que a pessoa está sentindo vontade de fazer.
5. Examinar: explorar o que ela espera obter e quais consequências são possíveis.
6. Escolher: sugerir uma próxima ação pequena, segura e coerente com os objetivos do usuário.

Exemplos de situações

* Vontade de enviar uma mensagem impulsiva.
* Descoberta de uma publicação que provocou ciúme.
* Sensação de rejeição após ausência de resposta.
* Saudade intensa depois de um período de melhora.
* Vontade de retomar uma relação que vinha causando sofrimento.

O SOS não deverá prometer eliminar a dor em poucos minutos. Sua finalidade é apoiar uma decisão mais consciente.

Se houver ameaça, violência, coerção ou risco de autoagressão, o fluxo deverá priorizar segurança e apoio humano, em vez de insistir nos exercícios comuns.

⸻

7. Conselheira de IA — LÚCIDA

7.1. Papel

A LÚCIDA deverá atuar como conselheira conversacional de apoio, reflexão e orientação prática dentro do escopo do produto.

Ela deverá:

* Compreender o contexto relatado.
* Fazer perguntas quando faltarem informações importantes.
* Distinguir fatos, interpretações e hipóteses.
* Identificar padrões descritos pelo próprio usuário.
* Propor exercícios e próximos passos.
* Retomar objetivos previamente registrados, quando houver memória autorizada.
* Reconhecer incertezas.
* Recomendar apoio profissional ou humano quando apropriado.

Ela não deverá:

* Diagnosticar transtornos.
* Garantir que uma pessoa ama, trai, manipula ou pretende voltar sem evidências suficientes.
* Incentivar perseguição, vigilância ou invasão de privacidade.
* Ensinar manipulação emocional para conquistar alguém.
* Substituir atendimento psicológico, médico, jurídico ou serviços de emergência.
* Tratar sua interpretação como verdade absoluta.

7.2. Estilo de conversa

A linguagem deverá ser humana, acolhedora, clara e direta.

A conselheira não deverá concordar automaticamente com todas as conclusões do usuário. Também não deverá humilhar, infantilizar ou culpabilizar quem está sofrendo.

Exemplo:

Usuário: “Ele visualizou e não respondeu. Tenho certeza de que está tentando me manipular.”

Resposta desejada:

“Entendo por que isso mexeu com você. Mas vamos separar o que sabemos do que estamos supondo: ele visualizou e não respondeu. Ainda não sabemos o motivo. O que essa ausência de resposta despertou em você e o que você está sentindo vontade de fazer agora?”

7.3. Continuidade contextual

Se a infraestrutura permitir, a LÚCIDA poderá utilizar:

* Resumo do momento atual.
* Exercícios concluídos.
* Objetivos escolhidos pelo usuário.
* Estratégias que o usuário considerou úteis.
* Preferências de interação autorizadas.

A memória deverá ser transparente, limitada ao necessário e sujeita às configurações de privacidade.

A conversa não deverá depender de uma memória que não tenha sido implementada ou cuja disponibilidade não possa ser comprovada.

7.4. Transferência para a jornada

A conselheira deverá recomendar exercícios específicos quando forem pertinentes.

Exemplo: se o usuário relatar que interpreta qualquer silêncio como rejeição, poderá sugerir o exercício “Fato, interpretação e esperança”.

O usuário poderá iniciar o exercício, recusá-lo ou continuar conversando.

⸻

8. Meu Progresso

O progresso deverá ser medido por comportamentos e percepções relatados, não por uma pontuação arbitrária de cura.

Indicadores possíveis:

* Capacidade de identificar emoções.
* Frequência percebida de comportamentos impulsivos.
* Facilidade para retomar a rotina.
* Clareza sobre limites e reciprocidade.
* Capacidade de tolerar incertezas.
* Confiança para tomar decisões coerentes com os próprios valores.

O sistema poderá oferecer registros periódicos e comparações com avaliações anteriores.

Não deverá afirmar que o usuário está curado, que superou definitivamente alguém ou que apresenta uma melhora clínica com base apenas nesses indicadores.

O usuário deverá poder pular avaliações e continuar utilizando o produto.

⸻

9. Requisitos de interface e experiência

A interface deverá:

* Ser simples e compreensível para pessoas com diferentes níveis de familiaridade tecnológica.
* Priorizar o uso em celulares.
* Permitir acesso rápido ao SOS.
* Exibir claramente o progresso da jornada.
* Evitar excesso de notificações.
* Permitir continuar de onde o usuário parou, quando houver persistência implementada.
* Disponibilizar controles de privacidade e exclusão de dados.
* Não utilizar contagens regressivas, ameaças de perda de progresso ou mensagens que criem dependência do aplicativo.
* Evitar mecanismos de engajamento que estimulem ruminação sobre o ex-parceiro.

A identidade visual deverá seguir o sistema de design oficial do ecossistema Relacione-se, a ser confirmado mediante inspeção dos arquivos existentes.

⸻

10. Integração com Magnetus3 e LÚCIDA

A integração deverá ser planejada sem duplicar funcionalidades desnecessariamente.

Magnetus3

Deverá funcionar como ambiente de acesso ao produto, conforme a arquitetura existente e após confirmação técnica.

LÚCIDA

Deverá fornecer a camada de inteligência conversacional, se a infraestrutura existente permitir essa integração.

Identidade do usuário

Se já existir autenticação compartilhada, deverá ser avaliada a possibilidade de reutilizá-la, sem criar uma segunda conta desnecessária.

Jornada e dados

Os registros da jornada e o contexto conversacional deverão ter contratos de dados definidos antes da implementação.

Limites da integração

Nenhuma das seguintes capacidades deverá ser presumida:

* Login compartilhado.
* Memória persistente entre sessões.
* Integração automática com todos os módulos do Magnetus3.
* Acesso da IA a todo o histórico do usuário.
* Sincronização de progresso.
* Disponibilidade contínua da conselheira.

Cada capacidade deverá ser verificada e testada separadamente.

⸻

11. Privacidade, segurança e proteção emocional

O produto poderá lidar com relatos íntimos e dados pessoais. A privacidade deverá fazer parte da arquitetura, não ser acrescentada no final.

Requisitos:

* Coletar apenas os dados necessários.
* Informar quais dados são armazenados e para quais finalidades.
* Proteger dados em trânsito e em repouso, conforme a arquitetura adotada.
* Restringir o acesso a conversas e registros.
* Não utilizar relatos íntimos em publicidade personalizada.
* Oferecer procedimentos claros de exclusão de dados.
* Não expor conversas entre usuários ou em painéis administrativos sem autorização apropriada.
* Avaliar retenção, backups, registros técnicos e dados enviados a provedores de IA.
* Implementar controles contra tentativas de extrair informações privadas por meio de instruções maliciosas.

Situações de risco

Se o usuário relatar violência, ameaça, perseguição, coerção ou perigo imediato, o sistema deverá priorizar segurança e acesso a ajuda humana.

No Brasil, quando pertinente:

* 190: emergência policial.
* 192: SAMU.
* 180: Central de Atendimento à Mulher, para orientação e atendimento a mulheres em situação de violência.

Em situações de risco de autoagressão, o sistema deverá incentivar contato imediato com serviços de emergência e pessoas de confiança, de acordo com a gravidade relatada.

O sistema não deverá apresentar a IA como serviço de emergência nem como substituta de profissionais habilitados.

⸻

12. Requisitos técnicos propostos

A implementação deverá ser adaptada à arquitetura real do repositório.

Antes de escolher tecnologias ou alterar serviços, a equipe deverá identificar:

* Framework e versão.
* Estrutura das rotas.
* Autenticação.
* Banco de dados.
* Serviços de IA disponíveis.
* Gestão de segredos e variáveis de ambiente.
* Hospedagem e processo de publicação.
* Testes automatizados existentes.
* Padrões de interface e componentes compartilhados.

Capacidades técnicas necessárias

1. Módulo de jornada: disponibilizar conteúdo, exercícios, respostas e estado de conclusão.
2. Serviço conversacional: receber mensagens, aplicar instruções de segurança e retornar respostas.
3. Persistência: salvar somente os dados necessários, conforme as escolhas de privacidade.
4. Orquestração: relacionar a conversa aos exercícios relevantes, sem criar dependência obrigatória.
5. Observabilidade: registrar erros técnicos sem expor desnecessariamente o conteúdo íntimo das conversas.
6. Controle de custos: estabelecer limites de uso, monitorar consumo e lidar com indisponibilidade do provedor.
7. Segurança: validar permissões, proteger credenciais e limitar acesso a dados.

A escolha de APIs, tabelas, endpoints e bibliotecas deverá ocorrer depois da auditoria técnica. Este documento não determina que esses elementos já existam.

⸻

13. Critérios de aceitação

Uma funcionalidade somente poderá ser considerada pronta quando houver evidência verificável.

Jornada

* O usuário consegue iniciar a jornada.
* Consegue escolher seu contexto.
* Consegue realizar um exercício.
* As respostas são processadas conforme o comportamento especificado.
* A continuidade após sair e voltar funciona, caso essa capacidade faça parte da entrega.

SOS

* O acesso está disponível nas áreas previstas.
* O fluxo ajuda a identificar o gatilho e a escolher uma ação.
* As situações de risco seguem o fluxo de segurança definido.
* Falhas de conexão não simulam que o pedido de ajuda foi atendido.

Conselheira de IA

* Responde de acordo com o contexto recebido.
* Reconhece quando não dispõe de informações suficientes.
* Não apresenta hipóteses sobre terceiros como fatos.
* Não incentiva vigilância, perseguição ou manipulação.
* Encaminha situações de risco para apoio humano adequado.
* Lida de forma controlada com indisponibilidade e erros do provedor.

Progresso

* Os indicadores são explicados ao usuário.
* Os registros correspondem às respostas efetivamente fornecidas.
* O usuário pode pular etapas não obrigatórias.
* Não há alegações de cura ou diagnóstico com base em pontuações.

Privacidade

* O acesso aos registros respeita as permissões.
* Os mecanismos de exclusão funcionam conforme a política definida.
* Os dados não são expostos por rotas ou consultas indevidamente autorizadas.
* A documentação informa os provedores externos que recebem dados, quando aplicável.

⸻

14. Escopo da primeira versão — MVP

A primeira versão deverá priorizar uma experiência funcional pequena, completa e testável.

Incluído no MVP

* Página inicial e apresentação do produto.
* Seleção do contexto amoroso.
* Avaliação inicial curta.
* Primeiros exercícios da jornada.
* Conselheira de IA com instruções próprias e limites definidos.
* SOS Emocional básico.
* Registro mínimo de progresso.
* Tratamento de erros e indisponibilidade.
* Controles essenciais de privacidade.
* Testes dos fluxos principais.

Fora do MVP, salvo decisão posterior

* Voz em tempo real.
* Aplicativo nativo independente.
* Comunidade pública entre usuários.
* Gamificação extensa.
* Análise automática de mensagens privadas de terceiros.
* Diagnósticos psicológicos.
* Promessas de reconciliação.
* Integrações externas que não sejam essenciais.

A jornada completa de oito módulos poderá ser liberada por etapas. O conteúdo e os critérios de conclusão deverão ser aprovados antes de se considerar a jornada finalizada.

⸻

15. Plano de implementação

Fase 0 — Auditoria

Identificar o que existe de fato no repositório, na hospedagem e nos serviços conectados.

Entrega: inventário com evidências, lacunas, riscos e dependências.

Fase 1 — Fundação

Definir arquitetura, modelo de dados, permissões, conteúdo inicial e instruções da conselheira.

Entrega: estrutura técnica aprovada e contratos funcionais documentados.

Fase 2 — Jornada

Construir a seleção de contexto, avaliação inicial, exercícios e persistência necessária.

Entrega: fluxo de jornada testável.

Fase 3 — Inteligência conversacional

Integrar a LÚCIDA ao contexto autorizado, com tratamento de erros, segurança e limites de uso.

Entrega: conversação funcional e testada.

Fase 4 — SOS e progresso

Implementar os fluxos de apoio imediato, os registros e os indicadores definidos.

Entrega: acompanhamento integrado à jornada.

Fase 5 — Homologação

Testar em dispositivos móveis, verificar permissões, validar privacidade e corrigir falhas.

Entrega: relatório de testes e decisão documentada de liberação.

⸻

16. Definição de pronto

O Dor de Cotovelo não estará pronto apenas porque a página abre, o botão funciona ou a IA consegue conversar.

A primeira versão será considerada apta para liberação quando:

1. Os fluxos previstos estiverem implementados.
2. Os critérios de aceitação forem comprovados por testes.
3. Os dados estiverem protegidos conforme os requisitos aprovados.
4. A conselheira respeitar os limites funcionais e de segurança.
5. O usuário conseguir concluir uma experiência real de ponta a ponta.
6. Os erros e as limitações estiverem documentados.
7. A homologação estiver registrada.

Regra de governança: nenhuma funcionalidade deverá ser marcada como concluída sem evidência. Planejado não significa implementado; implementado não significa testado; testado não significa homologado.

⸻

17. Decisões pendentes

Antes da implementação, deverão ser definidos:

* Nome e posicionamento comercial definitivos.
* Modelo de acesso: gratuito, pago, bônus ou combinação.
* Conteúdo integral dos exercícios.
* Política de retenção e exclusão de dados.
* Provedor e orçamento de IA.
* Forma de integração com a autenticação e os dados do Magnetus3.
* Critérios de avaliação do MVP.
* Responsáveis pela aprovação editorial, técnica e de segurança.

18. Próximo passo recomendado

Começar pela Fase 0 — Auditoria, sem alterar código, publicar serviços ou modificar configurações.

A auditoria deverá verificar o repositório Dor de Cotovelo e seus vínculos com Magnetus3, identificar documentos, código, rotas, serviços e histórico de alterações, e comparar os achados com esta especificação.

O resultado deverá separar claramente:

* O que existe e foi comprovado.
* O que existe parcialmente.
* O que foi planejado, mas não foi encontrado implementado.
* O que não foi possível verificar.
* O que precisa ser construído.

Somente depois dessa análise deverá ser aprovado o plano técnico definitivo.

Resultado pretendido: um produto de apoio ao sofrimento amoroso que acolhe sem infantilizar, confronta sem humilhar e ajuda o usuário a recuperar a capacidade de escolher — sem transformar sua dor em dependência de outro relacionamento ou do próprio aplicativo.
