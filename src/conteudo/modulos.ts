/** Jornada de oito módulos. Não há prazo: cada pessoa segue no próprio ritmo. */
export type Campo =
  | { id: string; tipo: "texto"; pergunta: string; ajuda?: string; exemplo?: string }
  | { id: string; tipo: "escolha"; pergunta: string; ajuda?: string; opcoes: string[]; multipla?: boolean }
  | { id: string; tipo: "escala"; pergunta: string; ajuda?: string; minimo: string; maximo: string };

export type Modulo = {
  id: "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8";
  numero: number;
  titulo: string;
  objetivo: string;
  abertura: string[];
  campos: Campo[];
  aviso?: string;
  resultado: string;
};

export const modulos: Modulo[] = [
  {
    id: "m1",
    numero: 1,
    titulo: "O que está acontecendo comigo?",
    objetivo: "Dar nome às emoções, aos acontecimentos e às necessidades de agora.",
    abertura: [
      "Antes de decidir qualquer coisa, vale olhar com calma para o que está acontecendo. Não para resolver a vida hoje: para dar nome.",
      "Quando a dor ganha nome, ela continua doendo, mas deixa de ser uma névoa que ocupa tudo.",
    ],
    campos: [
      { id: "emocao", tipo: "escolha", multipla: true, pergunta: "Qual emoção está mais forte agora?", opcoes: ["Saudade", "Tristeza", "Raiva", "Ciúme", "Ansiedade", "Vergonha", "Culpa", "Medo", "Alívio misturado com dor", "Confusão"] },
      { id: "acontecimento", tipo: "texto", pergunta: "O que aconteceu que despertou isso?", ajuda: "Descreva como uma câmera filmaria: o que foi dito, feito ou visto." },
      { id: "pensamento", tipo: "texto", pergunta: "Que pensamento volta na sua cabeça sem você chamar?" },
      { id: "controle", tipo: "texto", pergunta: "O que está nas suas mãos agora?", ajuda: "Pode ser pequeno: o que você faz hoje, o que responde, como cuida de você." },
      { id: "fora-do-controle", tipo: "texto", pergunta: "E o que não está nas suas mãos?", ajuda: "O que a outra pessoa sente, decide ou faz." },
    ],
    resultado: "Você consegue descrever melhor o que está vivendo, sem precisar encontrar agora uma solução definitiva.",
  },
  {
    id: "m2",
    numero: 2,
    titulo: "Fato, interpretação e esperança",
    objetivo: "Separar o que aconteceu do significado que você deu ao que aconteceu.",
    abertura: [
      "Um mesmo acontecimento costuma vir com três camadas: o fato, a interpretação e a esperança. Misturadas, elas viram certeza. Separadas, viram escolha.",
      "Exemplo. Fato: a pessoa não respondeu à mensagem. Interpretação: \"ela está me testando\". Esperança: \"talvez esteja esperando que eu insista\".",
    ],
    campos: [
      { id: "fato", tipo: "texto", pergunta: "O que aconteceu de forma observável?", ajuda: "Só o que qualquer pessoa veria ou ouviria.", exemplo: "Mandei mensagem às 20h e ela não respondeu até agora." },
      { id: "interpretacao", tipo: "texto", pergunta: "O que você está interpretando?", exemplo: "Ela está me ignorando de propósito." },
      { id: "esperanca", tipo: "texto", pergunta: "O que você deseja que seja verdade?", exemplo: "Que ela esteja esperando que eu insista." },
      { id: "outras", tipo: "texto", pergunta: "Que outras explicações também seriam possíveis para o mesmo fato?" },
      { id: "so-fato", tipo: "texto", pergunta: "O que você faria se tratasse isso apenas como fato?" },
    ],
    aviso: "Hipótese não é fato. Uma interpretação pode estar certa, mas ainda precisa de dados para virar conclusão.",
    resultado: "Você passa a avaliar situações sem tratar suposições como certezas.",
  },
  {
    id: "m3",
    numero: 3,
    titulo: "O ciclo que me prende",
    objetivo: "Reconhecer o padrão que prolonga o sofrimento e o ponto em que dá para agir diferente.",
    abertura: [
      "Muitas vezes a dor vira um circuito: algo dispara a ansiedade, você faz alguma coisa para aliviar, vem um alívio curto ou uma nova frustração, e tudo recomeça.",
      "O seu ciclo é seu. Este exercício mapeia a sua experiência, não uma regra que vale para todo mundo.",
    ],
    campos: [
      { id: "gatilho", tipo: "texto", pergunta: "O que costuma disparar o ciclo?", exemplo: "Ver que ela ficou online e não falou comigo." },
      { id: "sensacao", tipo: "texto", pergunta: "O que você sente no corpo e na cabeça quando isso acontece?" },
      { id: "alivio", tipo: "escolha", multipla: true, pergunta: "O que você faz para aliviar?", opcoes: ["Olho as redes da pessoa", "Mando mensagem", "Releio conversas", "Pergunto a amigos sobre ela", "Fico pensando em cenários", "Outra coisa"] },
      { id: "depois", tipo: "texto", pergunta: "O que vem depois: alívio, frustração, os dois? Quanto tempo dura?" },
      { id: "ponto", tipo: "texto", pergunta: "Em que ponto do ciclo você poderia fazer algo diferente?" },
      { id: "alternativa", tipo: "texto", pergunta: "Qual alternativa cabe nesse ponto?", exemplo: "Deixar o celular em outro cômodo por 20 minutos e escrever o que sinto." },
    ],
    resultado: "Você identifica seus gatilhos e tem uma alternativa possível para o próximo ciclo.",
  },
  {
    id: "m4",
    numero: 4,
    titulo: "Limites, reciprocidade e realidade",
    objetivo: "Olhar o vínculo pelas atitudes, pelas necessidades e pelos limites, não só pelo sentimento.",
    abertura: [
      "Sentimento forte não é a mesma coisa que vínculo recíproco. Aqui você olha para o que acontece de forma consistente, não para o que acontece de vez em quando.",
    ],
    campos: [
      { id: "reciprocidade", tipo: "escala", pergunta: "Existe reciprocidade consistente?", minimo: "Quase nunca", maximo: "Quase sempre" },
      { id: "necessidades", tipo: "escala", pergunta: "Você consegue expressar suas necessidades sem medo?", minimo: "Quase nunca", maximo: "Quase sempre" },
      { id: "limites", tipo: "escala", pergunta: "Seus limites são respeitados?", minimo: "Quase nunca", maximo: "Quase sempre" },
      { id: "promessas", tipo: "escala", pergunta: "As atitudes correspondem às promessas?", minimo: "Quase nunca", maximo: "Quase sempre" },
      { id: "seguranca", tipo: "escala", pergunta: "Você se sente em segurança nesse vínculo?", minimo: "Quase nunca", maximo: "Quase sempre" },
      { id: "viavel", tipo: "texto", pergunta: "O que precisaria mudar para essa relação ser viável? E quem teria de mudar?" },
    ],
    aviso: "Este exercício não decide por você se deve terminar ou continuar. Se você sente medo da reação da outra pessoa, a sua segurança vem primeiro: abra o SOS.",
    resultado: "Você enxerga com mais clareza as condições reais do vínculo.",
  },
  {
    id: "m5",
    numero: 5,
    titulo: "Recuperar o próprio eixo",
    objetivo: "Reconstruir a vida para além da situação amorosa, mesmo sem estar bem.",
    abertura: [
      "A dor costuma ocupar o espaço de tudo o que sustentava você. Recuperar o eixo não exige estar bem: exige um passo pequeno, feito mesmo sem vontade.",
    ],
    campos: [
      { id: "de-lado", tipo: "escolha", multipla: true, pergunta: "O que ficou de lado?", opcoes: ["Sono", "Alimentação", "Amizades", "Trabalho ou estudo", "Corpo e movimento", "Algo que eu gostava de fazer", "Fé ou espiritualidade", "Cuidado com a casa", "Dinheiro"] },
      { id: "retomar", tipo: "texto", pergunta: "Uma coisa pequena que você vai retomar hoje, mesmo sem vontade.", exemplo: "Caminhar dez minutos depois do almoço." },
      { id: "pessoa", tipo: "texto", pergunta: "Uma pessoa de confiança com quem você pode falar nesta semana." },
      { id: "compromisso", tipo: "texto", pergunta: "Seu compromisso de hoje, que caiba em quinze minutos." },
    ],
    resultado: "Você recupera espaços de autonomia sem precisar já estar emocionalmente bem.",
  },
  {
    id: "m6",
    numero: 6,
    titulo: "Impulso não é ordem",
    objetivo: "Criar espaço entre sentir vontade e agir.",
    abertura: [
      "A vontade de mandar mensagem, procurar ou voltar costuma chegar como urgência. Urgência não é ordem: é um pico, e picos baixam quando não são alimentados.",
      "Não existe uma regra universal de bloquear, sumir ou ficar em silêncio. A sua escolha depende do seu contexto, dos seus limites e da sua segurança.",
    ],
    campos: [
      { id: "gatilho", tipo: "texto", pergunta: "O que disparou a vontade?" },
      { id: "urgencia", tipo: "escala", pergunta: "Qual o tamanho da urgência agora?", minimo: "Leve", maximo: "Muito forte" },
      { id: "espera", tipo: "texto", pergunta: "O que você espera conseguir se agir agora?" },
      { id: "consequencias", tipo: "texto", pergunta: "O que pode acontecer depois? O melhor, o mais provável e o pior." },
      { id: "escolha", tipo: "escolha", pergunta: "O que você escolhe?", opcoes: ["Agir, com intenção clara", "Esperar e rever amanhã", "Não agir"] },
      { id: "revisao", tipo: "texto", pergunta: "Algumas horas depois: como você se sente com a escolha?", ajuda: "Volte aqui mais tarde para responder." },
    ],
    resultado: "Você ganha capacidade de fazer escolhas deliberadas, mesmo com vontade forte.",
  },
  {
    id: "m7",
    numero: 7,
    titulo: "Autonomia e padrões relacionais",
    objetivo: "Entender suas necessidades, seus limites e os padrões que você quer mudar.",
    abertura: [
      "Ter necessidades numa relação é legítimo. O que vale observar é quando a necessidade de aprovação toma o lugar da compatibilidade.",
      "A responsabilidade pelo comportamento da outra pessoa é dela. Você não precisa consertar ninguém para merecer cuidado.",
    ],
    campos: [
      { id: "necessidades", tipo: "texto", pergunta: "Quais necessidades você tem numa relação?", exemplo: "Constância, conversa, respeito ao meu tempo." },
      { id: "aprovacao", tipo: "texto", pergunta: "Quando você busca aprovação, como isso aparece?", exemplo: "Concordo para não brigar, me ajusto ao humor da pessoa." },
      { id: "compatibilidade", tipo: "texto", pergunta: "E quando há compatibilidade de verdade, como isso aparece?" },
      { id: "concessoes", tipo: "texto", pergunta: "Que concessões ultrapassaram os seus limites?" },
      { id: "criterios", tipo: "texto", pergunta: "Três critérios para as suas próximas relações." },
      { id: "acordo", tipo: "texto", pergunta: "Seu acordo pessoal: quando eu sentir ___, eu vou ___.", exemplo: "Quando eu sentir que estou me anulando, eu vou dizer o que preciso." },
    ],
    resultado: "Você ganha clareza sobre o que deseja construir e o que não quer repetir.",
  },
  {
    id: "m8",
    numero: 8,
    titulo: "Continuidade e prevenção de recaídas",
    objetivo: "Reunir o que você aprendeu num plano para os momentos difíceis.",
    abertura: [
      "Este é o seu plano pessoal. Ele fica guardado no seu Progresso para você reler quando precisar.",
      "Sentir saudade ou tristeza de novo não significa perder o que você construiu.",
    ],
    campos: [
      { id: "gatilhos", tipo: "texto", pergunta: "Meus principais gatilhos." },
      { id: "aprendi", tipo: "texto", pergunta: "O que aprendi sobre mim." },
      { id: "quando", tipo: "texto", pergunta: "O que faço quando sentir vontade de repetir o padrão." },
      { id: "apoio", tipo: "texto", pergunta: "Pessoas e recursos que podem me apoiar." },
      { id: "limites", tipo: "texto", pergunta: "Limites que quero preservar." },
      { id: "acoes", tipo: "texto", pergunta: "Minhas próximas ações concretas." },
      { id: "ancora", tipo: "texto", pergunta: "Uma frase para eu ler nos dias difíceis.", exemplo: "A dor é real, mas não é ela quem decide por mim." },
    ],
    resultado: "Você tem um plano de continuidade adaptado à sua realidade.",
  },
];

export const modulo = (id: string) => modulos.find(m => m.id === id);
