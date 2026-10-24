import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apagarTudo, carregar, salvar, type Estado } from "./estado.ts";

const armazenamento = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

type Valor = { estado: Estado; atualizar: (f: (e: Estado) => Estado) => void; apagar: () => void };
const Contexto = createContext<Valor | null>(null);

export function ProvedorEstado({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(() => carregar(armazenamento()));
  useEffect(() => salvar(armazenamento(), estado), [estado]);
  return (
    <Contexto.Provider value={{ estado, atualizar: f => setEstado(e => f(e)), apagar: () => setEstado(apagarTudo(armazenamento())) }}>
      {children}
    </Contexto.Provider>
  );
}

export function useEstado() {
  const v = useContext(Contexto);
  if (!v) throw new Error("ProvedorEstado ausente");
  return v;
}
