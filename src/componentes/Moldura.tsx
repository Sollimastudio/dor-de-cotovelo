import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Home, LineChart, MessageCircle } from "lucide-react";

const abas = [
  { href: "/", rotulo: "Início", Icone: Home },
  { href: "/jornada", rotulo: "Jornada", Icone: BookOpen },
  { href: "/lucida", rotulo: "LÚCIDA", Icone: MessageCircle },
  { href: "/progresso", rotulo: "Progresso", Icone: LineChart },
];

export default function Moldura({ children }: { children: ReactNode }) {
  const [local] = useLocation();
  const ativa = (href: string) => (href === "/" ? local === "/" : local.startsWith(href));
  return (
    <>
      <a className="pular" href="#conteudo">Ir para o conteúdo</a>
      <header className="topo">
        <Link href="/" className="marca" aria-label="Dor de Cotovelo, início">
          <span className="marca-nome">Dor de Cotovelo</span>
          <span className="marca-assinatura">por Sol Lima</span>
        </Link>
        {local !== "/sos" && (
          <Link href="/sos" className="botao-sos" aria-label="Abrir o SOS Emocional">
            SOS
          </Link>
        )}
      </header>
      <main id="conteudo" className="conteudo" tabIndex={-1}>{children}</main>
      <nav className="abas" aria-label="Navegação principal">
        {abas.map(({ href, rotulo, Icone }) => (
          <Link key={href} href={href} className={ativa(href) ? "aba ativa" : "aba"} aria-current={ativa(href) ? "page" : undefined}>
            <Icone size={20} aria-hidden="true" />
            <span>{rotulo}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
