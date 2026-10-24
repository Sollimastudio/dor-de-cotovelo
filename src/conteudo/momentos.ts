/** "O que está doendo mais em você agora?" — a pessoa pode marcar mais de uma. */
export const momentos = [
  { id: "foi-embora", rotulo: "A pessoa foi embora.", contexto: "Término" },
  { id: "nao-corresponde", rotulo: "A pessoa não me corresponde.", contexto: "Rejeição ou paixão não correspondida" },
  { id: "nao-paro-de-pensar", rotulo: "Não consigo parar de pensar nela.", contexto: "Pensamento que não para" },
  { id: "juntos-inseguro", rotulo: "Continuamos juntos, mas vivo inseguro ou sofrendo.", contexto: "Relação atual com sofrimento" },
  { id: "idas-e-vindas", rotulo: "Terminamos e voltamos várias vezes.", contexto: "Idas e vindas" },
  { id: "me-perdi", rotulo: "Sinto que perdi a mim mesmo nessa história.", contexto: "Dependência emocional percebida" },
  { id: "nao-sei", rotulo: "Não sei exatamente o que estou sentindo.", contexto: "Ainda sem nome" },
] as const;

export type MomentoId = (typeof momentos)[number]["id"];
