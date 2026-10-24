/** Sinais de risco nas palavras da própria pessoa: levam à tela de segurança, nunca a um exercício comum. */
const PADRAO = /suic[ií]d|me matar|quero morrer|n[aã]o quero (?:mais )?viver|tirar (?:a )?minha (?:pr[oó]pria )?vida|me machucar|me cortar|acabar com tudo|n[aã]o aguento mais viver|me bateu|me agrediu|me amea[cç]|amea[cç]ou|estou em perigo|tenho medo d[ea]l[ea]|me persegue|perseguind|estupr|abuso sexual/i;

export function temSinalDeRisco(...textos: (string | null | undefined)[]) {
  return textos.some(t => typeof t === "string" && PADRAO.test(t));
}
