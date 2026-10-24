/** Avaliação inicial curta: uma pergunta por tela, todas podem ser puladas. */
export type Opcao = { id: string; rotulo: string };
export type PerguntaAvaliacao = { id: "duracao" | "dificuldade" | "rotina" | "repeticoes" | "mudanca"; pergunta: string; ajuda?: string; multipla?: boolean; opcoes: Opcao[] };

export const avaliacao: PerguntaAvaliacao[] = [
  {
    id: "duracao",
    pergunta: "Há quanto tempo isso está acontecendo?",
    opcoes: [
      { id: "dias", rotulo: "Menos de uma semana" },
      { id: "semanas", rotulo: "De uma a quatro semanas" },
      { id: "meses", rotulo: "De um a seis meses" },
      { id: "mais-6-meses", rotulo: "Mais de seis meses" },
      { id: "vai-e-volta", rotulo: "Vai e volta há bastante tempo" },
    ],
  },
  {
    id: "dificuldade",
    pergunta: "Qual é a sua maior dificuldade neste momento?",
    opcoes: [
      { id: "impulso", rotulo: "Segurar a vontade de mandar mensagem ou procurar" },
      { id: "pensamento", rotulo: "Parar de pensar na pessoa" },
      { id: "aceitar", rotulo: "Aceitar que acabou, ou que não é recíproco" },
      { id: "entender", rotulo: "Entender o que é real e o que eu imagino" },
      { id: "rotina", rotulo: "Cuidar de mim e da minha rotina" },
      { id: "inseguranca", rotulo: "Lidar com insegurança ou medo dentro da relação" },
    ],
  },
  {
    id: "rotina",
    pergunta: "Quanto isso está atrapalhando o seu dia a dia?",
    ajuda: "Sono, trabalho, alimentação, vontade de fazer as coisas.",
    opcoes: [
      { id: "pouco", rotulo: "Pouco" },
      { id: "algum", rotulo: "Um pouco" },
      { id: "bastante", rotulo: "Bastante" },
      { id: "muito", rotulo: "Muito: mal estou conseguindo funcionar" },
    ],
  },
  {
    id: "repeticoes",
    pergunta: "O que tem se repetido?",
    ajuda: "Marque o que for verdade para você.",
    multipla: true,
    opcoes: [
      { id: "checar-redes", rotulo: "Olhar as redes da pessoa" },
      { id: "mandar-mensagens", rotulo: "Mandar mensagens para ter alívio" },
      { id: "reler-conversas", rotulo: "Reler conversas antigas" },
      { id: "voltar-terminar", rotulo: "Voltar e terminar de novo" },
      { id: "isolar", rotulo: "Me isolar das pessoas" },
      { id: "sono-apetite", rotulo: "Perder o sono ou o apetite" },
      { id: "nada", rotulo: "Nada disso" },
    ],
  },
  {
    id: "mudanca",
    pergunta: "Que mudança você quer alcançar?",
    ajuda: "Pode marcar mais de uma e escrever o seu objetivo com as suas palavras.",
    multipla: true,
    opcoes: [
      { id: "paz", rotulo: "Recuperar a paz" },
      { id: "impulso", rotulo: "Parar de agir no impulso" },
      { id: "real", rotulo: "Enxergar o que é real" },
      { id: "decidir", rotulo: "Decidir com clareza" },
      { id: "me-priorizar", rotulo: "Voltar a me priorizar" },
    ],
  },
];
