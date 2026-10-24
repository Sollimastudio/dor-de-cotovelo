# Dor de Cotovelo — Projeto guardado

Em 24/10/2026, Sol decidiu guardar o Dor de Cotovelo para usar depois e tirá-lo do app por enquanto. Este documento reúne o que ficou decidido e o que precisa ser feito antes de retomar.

## O que foi desligado

| Onde | O que foi feito | Como trazer de volta |
|---|---|---|
| App (Vercel, projeto `dor-de-cotovelo`) | Projeto pausado: o endereço responde "indisponível". Código e documentação continuam neste repositório. | Despausar o projeto na Vercel. |
| Conselheira (Magnetus3) | Endpoint `/api/lucida/dor` removido por revert (commits `89fd009` e `8aecaa3`). A LÚCIDA também deixou de citar `/dor-de-cotovelo` (`3cc7622`). | Reverter esses três commits e republicar. |
| Vitrine (relacionese-website) | Saíram o link do menu, a página "em breve", o card e o carrossel das ferramentas grátis, a ficha do catálogo e a rota conhecida pela LÚCIDA (`df38d60`). O produto continua no catálogo único; o portal só o esconde pela lista `GUARDADOS`. | Reverter `df38d60` e tirar `dor_de_cotovelo` de `GUARDADOS`. |

A variável `LUCIDA_PUBLIC_ORIGINS` no Magnetus3 ainda lista as origens do app. Sem o endpoint, ela não tem efeito. Pode ser apagada ou mantida para a retomada.

## O que Sol pediu para a próxima versão

- **Conversa no lugar de formulário.** O app abre com a LÚCIDA perguntando "O que está acontecendo com você?" e a pessoa responde com as próprias palavras.
- **Acolhimento imediato.** A LÚCIDA devolve uma leitura sobre a própria pessoa (padrões, forças, o que está acontecendo), sem rótulo clínico.
- **Respostas ricas, em balões curtos,** sempre com um próximo passo que mantenha a pessoa na conversa.
- **Ferramentas dentro da conversa, uma de cada vez.** Exemplo: "faz agora comigo o Script do Silêncio", com o cronômetro abrindo no chat, a explicação de por que funciona e "se precisar, tô aqui". As ferramentas gratuitas vêm primeiro; produtos pagos depois, com delicadeza, nunca em crise.
- **Menos botões e menos etapas.** Quem está ansiosa perde a paciência.
- **Visual aconchegante.** Pode manter a paleta, com ilustrações leves para descontrair (xícara, plantinha, carta não enviada).
- **Para mulheres e homens.** A LÚCIDA pergunta o nome e não presume gênero.
- **Avisos de violência e denúncia** continuam: 180 (inclusive pelo WhatsApp (61) 9610-0180) e 190.
- **Custo baixo.** Começar no teto atual da LÚCIDA (no máximo US$ 1,50 por dia) e só subir com divulgação.

## Pendências obrigatórias antes de voltar ao ar

1. **Detector de risco.** Em teste no dia 24/10, ele deixou passar 7 de 10 frases de crise. Exemplos: "só penso em morrer", "estou com uma faca na mão", "quero me mutilar", "queria dormir e não acordar", "vou acabar com a minha vida". É preciso ampliar a lista de sinais no app e no servidor e incluir testes com essas frases. O mesmo vale para a LÚCIDA da vitrine, que hoje depende só da IA para segurança.
2. **Mensagem de crise fixa,** escrita e revisada por Sol, nunca improvisada pela IA. Ela deve ter botões para ligar 188 e 192, a pergunta "tem alguém aí com você agora?" e um botão "avisar alguém de confiança", que abre o WhatsApp da pessoa com uma mensagem pronta.
3. **Idade.** Os termos da API do Gemini exigem 18 anos ou mais e proíbem o uso em serviços voltados a menores ou que provavelmente serão acessados por eles. Antes de retomar, é preciso escolher entre duas opções:
   - perguntar a idade e oferecer a menores de 18 um modo protegido, sem IA e sem ofertas, com CVV 188, SAMU 192, Disque 100, Conselho Tutelar e o canal Pode Falar (UNICEF, 13 a 24 anos);
   - usar um provedor de IA que permita esse público, com proteções extras.
4. **Verificação que não descarta a resposta.** Hoje, quando a IA faz mais de uma pergunta, a resposta inteira é recusada e o app mostra "tente novamente". Isso deve virar correção automática.
5. **Modo sem IA.** Quando o teto diário acabar ou o provedor cair, a conversa precisa continuar com um roteiro fixo e as ferramentas.

## Custo estimado (referência de 24/10/2026)

Cada mensagem da LÚCIDA custa no máximo uns 4 a 5 centavos de real; uma conversa completa de cerca de 15 mensagens fica em torno de R$ 0,75 no pior caso. O teto atual de US$ 1,50 por dia comporta de 10 a 15 conversas completas por dia. Ao atingir o teto, a conversa pausa e entra o modo sem IA.

## Serviços gratuitos que já existem (para indicar no app)

- **CVV, 188:** apoio emocional gratuito e sigiloso, 24 horas, por telefone. Também tem chat em cvv.org.br, com horário mais restrito.
- **Pode Falar (UNICEF):** chat gratuito e anônimo para quem tem de 13 a 24 anos, em podefalar.org.br.
- **Ligue 180:** Central de Atendimento à Mulher, por telefone e pelo WhatsApp (61) 9610-0180, com denúncia anônima.
- **SAMU 192** e **Polícia 190** para emergências.
