import type { Mensagem } from "./estado.ts";

/** Conselheira LÚCIDA: o servidor fica no Magnetus3, com o mesmo teto de custo da LÚCIDA pública. */
export const LUCIDA_URL = import.meta.env?.VITE_LUCIDA_URL || "https://relacionese-magnetus-m1.vercel.app/api/lucida/dor";

export type RespostaLucida = {
  message: string;
  question: string | null;
  next_step: string | null;
  stance: string;
  exercise_id: string | null;
  safety: boolean;
};

export class ErroLucida extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function statusLucida(): Promise<boolean> {
  try {
    const r = await fetch(LUCIDA_URL, { cache: "no-store" });
    return r.ok && (await r.json()).available === true;
  } catch {
    return false;
  }
}

export async function conversar(
  mensagens: Mensagem[],
  contexto: { momento: string[]; modulo: string | null; objetivo: string | null } | null,
): Promise<RespostaLucida> {
  let r: Response;
  try {
    r = await fetch(LUCIDA_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: mensagens.slice(-12), consent: { processing: true }, ...(contexto ? { context: contexto } : {}) }),
    });
  } catch {
    throw new ErroLucida("Sem conexão com a LÚCIDA agora. Sua mensagem continua na tela.", 0);
  }
  const corpo = await r.json().catch(() => null);
  if (!r.ok) {
    const padrao: Record<number, string> = {
      429: "Você chegou ao limite de mensagens de hoje, ou enviou muito rápido. Espere um pouco e tente de novo; o SOS e a jornada continuam disponíveis.",
      503: "A LÚCIDA está indisponível neste momento. O SOS e a jornada continuam funcionando.",
    };
    throw new ErroLucida(padrao[r.status] ?? (typeof corpo?.error === "string" ? corpo.error : null) ?? "A LÚCIDA não conseguiu responder agora. Tente novamente.", r.status);
  }
  return corpo as RespostaLucida;
}
