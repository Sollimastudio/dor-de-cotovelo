import { useState } from "react";
import { Link } from "wouter";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { temSinalDeRisco } from "../lib/risco.ts";
import ApoioHumano from "../componentes/ApoioHumano.tsx";

/** Mensagem que não envio: escrever tudo, sem destinatário. Fica só neste aparelho. */
export default function Rascunho() {
  const { estado, atualizar } = useEstado();
  const [texto, setTexto] = useState("");
  const guardar = () => {
    if (!texto.trim()) return;
    atualizar(e => ({ ...e, rascunhos: [{ id: crypto.randomUUID(), em: new Date().toISOString(), texto: texto.trim() }, ...e.rascunhos].slice(0, 30) }));
    setTexto("");
  };
  return (
    <div className="pagina">
      <Link className="voltar" href="/sos">← SOS Emocional</Link>
      <p className="sobretitulo">Mensagem que não envio</p>
      <h1>Escreva tudo. Ninguém vai receber.</h1>
      <p className="destaque">Coloque no papel o que você queria mandar: a pergunta, a raiva, a saudade, o pedido. Escrever tira a urgência do corpo sem criar uma consequência que você não escolheu.</p>
      <textarea rows={8} aria-label="Sua mensagem que não será enviada" value={texto} onChange={e => setTexto(e.target.value)} placeholder="Escreva como se fosse mandar." />
      {temSinalDeRisco(texto) && <ApoioHumano />}
      <div className="linha-botoes">
        <button className="botao" type="button" onClick={guardar} disabled={!texto.trim()}>Guardar sem enviar</button>
        <button className="botao secundario" type="button" onClick={() => setTexto("")}>Apagar o que escrevi</button>
      </div>
      <p className="nota">Releia amanhã. Muitas vezes a mensagem que parecia urgente perde a força, ou muda de forma.</p>
      {estado.rascunhos.length > 0 && (
        <section>
          <h2>Suas mensagens guardadas</h2>
          <ul className="rascunhos">
            {estado.rascunhos.map(r => (
              <li key={r.id} className="cartao suave">
                <small>{new Date(r.em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</small>
                <p>{r.texto}</p>
                <button className="botao texto" type="button" onClick={() => atualizar(e => ({ ...e, rascunhos: e.rascunhos.filter(x => x.id !== r.id) }))}>Apagar</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
