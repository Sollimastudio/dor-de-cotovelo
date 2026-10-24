import { temSinalDeRisco } from "./risco.ts";

export type Avaliacao = {
  duracao?: string;
  dificuldade?: string;
  rotina?: string;
  repeticoes?: string[];
  mudanca?: string[];
  objetivo?: string;
};

export type Plano = {
  inicio: "sos" | "m1" | "m2" | "m4" | "m5" | "m6";
  porque: string;
  depois: string[];
  apoioProfissional: boolean;
  seguranca: boolean;
};

/** Recomenda um ponto de entrada. É uma sugestão de caminho, nunca um diagnóstico. */
export function planoInicial(momento: string[], texto: string, a: Avaliacao): Plano {
  const seguranca = temSinalDeRisco(texto, a.objetivo);
  const intenso = a.rotina === "muito" || (a.rotina === "bastante" && ["mais-6-meses", "vai-e-volta"].includes(a.duracao ?? ""));
  const repete = a.repeticoes ?? [];
  const base = { apoioProfissional: intenso || seguranca, seguranca };
  if (seguranca)
    return { ...base, inicio: "sos", porque: "Você mencionou algo que pode envolver a sua segurança. Antes de qualquer exercício, vale buscar apoio humano.", depois: ["m1"] };
  if (a.dificuldade === "impulso" || repete.includes("mandar-mensagens") || repete.includes("checar-redes"))
    return { ...base, inicio: "sos", porque: "A vontade de agir no impulso apareceu forte. O SOS ajuda a atravessar esses minutos, e o módulo Impulso não é ordem treina essa pausa.", depois: ["m6", "m3"] };
  if (a.dificuldade === "rotina" || momento.includes("me-perdi") || repete.includes("isolar") || repete.includes("sono-apetite"))
    return { ...base, inicio: "m5", porque: "Sua vida ficou em segundo plano. Recuperar o próprio eixo começa por passos pequenos, mesmo sem vontade.", depois: ["m1", "m7"] };
  if (a.dificuldade === "aceitar")
    return { ...base, inicio: "m1", porque: "Aceitar uma perda começa por reconhecê-la: dar nome ao que você sente e ao que aconteceu, sem pressa de superar.", depois: ["m2", "m4"] };
  if (a.dificuldade === "inseguranca" || momento.includes("juntos-inseguro") || momento.includes("idas-e-vindas") || repete.includes("voltar-terminar"))
    return { ...base, inicio: "m2", porque: "Em relações ambíguas, separar o que aconteceu do que você imagina ou espera é o primeiro passo. Depois vem olhar limites e reciprocidade.", depois: ["m4", "m3"] };
  if (a.dificuldade === "entender" || momento.includes("nao-corresponde"))
    return { ...base, inicio: "m2", porque: "Quando falta reciprocidade, cada sinal vira esperança ou ameaça. Separar fato, interpretação e esperança traz chão.", depois: ["m4", "m1"] };
  return { ...base, inicio: "m1", porque: "Começar dando nome ao que está acontecendo ajuda a sair da névoa, sem precisar resolver tudo hoje.", depois: ["m2", "m3"] };
}
