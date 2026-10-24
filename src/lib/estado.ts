import type { Avaliacao, Plano } from "./plano.ts";

/** Tudo o que o app guarda fica só neste aparelho, nesta chave. Nada vai para servidor. */
export const CHAVE = "dor-de-cotovelo:v1";

export type Mensagem = { role: "user" | "assistant"; content: string };
export type Estado = {
  versao: 1;
  guardar: boolean;
  momento: string[];
  momentoTexto: string;
  avaliacao: Avaliacao;
  plano: Plano | null;
  modulos: Record<string, { respostas: Record<string, string | string[] | number>; concluidoEm?: string }>;
  sos: { em: string; situacao: string; antes?: number; depois?: number; escolha?: string }[];
  rascunhos: { id: string; em: string; texto: string }[];
  checkins: { em: string; valores: Record<string, number> }[];
  rede: string[];
  lucida: { consentimento: boolean; enviarContexto: boolean; conversa: Mensagem[] };
};

export const estadoInicial = (): Estado => ({
  versao: 1,
  guardar: true,
  momento: [],
  momentoTexto: "",
  avaliacao: {},
  plano: null,
  modulos: {},
  sos: [],
  rascunhos: [],
  checkins: [],
  rede: [],
  lucida: { consentimento: false, enviarContexto: true, conversa: [] },
});

type Armazenamento = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function carregar(s: Armazenamento | undefined): Estado {
  try {
    const bruto = s?.getItem(CHAVE);
    if (!bruto) return estadoInicial();
    const lido = JSON.parse(bruto);
    if (lido?.versao !== 1) return estadoInicial();
    return { ...estadoInicial(), ...lido, lucida: { ...estadoInicial().lucida, ...lido.lucida } };
  } catch {
    return estadoInicial();
  }
}

export function salvar(s: Armazenamento | undefined, e: Estado) {
  try {
    if (!e.guardar) s?.removeItem(CHAVE);
    else s?.setItem(CHAVE, JSON.stringify(e));
  } catch {
    /* sem armazenamento disponível: o app segue funcionando só na memória */
  }
}

export function apagarTudo(s: Armazenamento | undefined): Estado {
  try {
    s?.removeItem(CHAVE);
  } catch {
    /* nada a apagar */
  }
  return estadoInicial();
}

export const modulosConcluidos = (e: Estado) => Object.values(e.modulos).filter(m => m.concluidoEm).length;

/** Média de quanto a urgência baixou nos SOS em que a pessoa registrou antes e depois. */
export function quedaMediaDoImpulso(e: Estado) {
  const pares = e.sos.filter(s => typeof s.antes === "number" && typeof s.depois === "number");
  if (!pares.length) return null;
  return Math.round((pares.reduce((t, s) => t + (s.antes! - s.depois!), 0) / pares.length) * 10) / 10;
}
