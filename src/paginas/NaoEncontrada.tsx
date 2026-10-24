import { Link } from "wouter";

export default function NaoEncontrada() {
  return (
    <div className="pagina">
      <h1>Esta página não existe.</h1>
      <div className="linha-botoes">
        <Link className="botao" href="/">Voltar ao início</Link>
        <Link className="botao secundario" href="/sos">Abrir o SOS</Link>
      </div>
    </div>
  );
}
