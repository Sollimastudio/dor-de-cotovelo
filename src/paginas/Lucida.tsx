import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { conversar, ErroLucida, statusLucida, type RespostaLucida } from "../lib/lucida.ts";
import { modulo } from "../conteudo/modulos.ts";
import { temSinalDeRisco } from "../lib/risco.ts";
import ApoioHumano from "../componentes/ApoioHumano.tsx";

const rotuloExercicio = (id: string) => (id === "sos" ? "SOS Emocional" : id === "rascunho" ? "Mensagem que não envio" : modulo(id)?.titulo ?? id);
const destinoExercicio = (id: string) => (id === "sos" ? "/sos" : id === "rascunho" ? "/rascunho" : `/jornada/${id}`);

export default function Lucida() {
  const { estado, atualizar } = useEstado();
  const busca = new URLSearchParams(useSearch());
  const moduloAtual = busca.get("modulo");
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [ultima, setUltima] = useState<RespostaLucida | null>(null);
  const [disponivel, setDisponivel] = useState<boolean | null>(null);
  const fim = useRef<HTMLDivElement>(null);
  const { consentimento, enviarContexto, conversa } = estado.lucida;

  useEffect(() => { statusLucida().then(setDisponivel); }, []);
  useEffect(() => { fim.current?.scrollIntoView({ block: "end" }); }, [conversa.length, ultima]);

  const contexto = enviarContexto
    ? { momento: estado.momento, modulo: moduloAtual && modulo(moduloAtual) ? moduloAtual : null, objetivo: estado.avaliacao.objetivo?.trim().slice(0, 300) || null }
    : null;

  async function enviar() {
    const conteudo = texto.trim();
    if (!conteudo || enviando) return;
    const historico = [...conversa, { role: "user" as const, content: conteudo }];
    atualizar(e => ({ ...e, lucida: { ...e.lucida, conversa: historico } }));
    setTexto("");
    setErro("");
    setEnviando(true);
    try {
      const r = await conversar(historico, contexto);
      setUltima(r);
      const resposta = [r.message, r.question, r.next_step ? `Um passo possível: ${r.next_step}` : null].filter(Boolean).join("\n\n");
      atualizar(e => ({ ...e, lucida: { ...e.lucida, conversa: [...historico, { role: "assistant", content: resposta }] } }));
    } catch (e) {
      setErro(e instanceof ErroLucida ? e.message : "A LÚCIDA não conseguiu responder agora.");
      atualizar(s => ({ ...s, lucida: { ...s.lucida, conversa: historico.slice(0, -1) } }));
      setTexto(conteudo);
    } finally {
      setEnviando(false);
    }
  }

  if (!consentimento)
    return (
      <div className="pagina">
        <p className="sobretitulo">Converse com a LÚCIDA</p>
        <h1>Uma conselheira para pensar com você.</h1>
        <p className="destaque">A LÚCIDA, inteligência de reflexão de Sol Lima, ajuda a separar o que aconteceu do que você está supondo, a olhar para os seus padrões e a escolher o próximo passo. Ela é uma IA: não é a Sol, não é terapeuta e não é serviço de emergência.</p>
        <div className="cartao suave">
          <h2>Antes de começar</h2>
          <ul>
            <li>Suas mensagens são enviadas para processamento pela IA (Google Gemini), pelo servidor do Relacione-se. A conversa não é guardada no servidor: o histórico fica só neste aparelho.</li>
            <li>Se você permitir, ela também recebe o seu momento, o módulo em que você está e o seu objetivo. Você pode desligar isso.</li>
            <li>Ela não diagnostica, não garante o que a outra pessoa sente ou pretende e não ensina a vigiar nem a reconquistar ninguém.</li>
            <li>Há um limite de mensagens por dia, para manter o serviço gratuito e sustentável.</li>
          </ul>
          <button className="botao" type="button" onClick={() => atualizar(e => ({ ...e, lucida: { ...e.lucida, consentimento: true } }))}>Concordo e quero conversar</button>
        </div>
        <p className="nota">Prefere não usar IA? O <Link href="/sos">SOS</Link> e a <Link href="/jornada">jornada</Link> funcionam sem ela.</p>
      </div>
    );

  return (
    <div className="pagina conversa">
      <p className="sobretitulo">Converse com a LÚCIDA</p>
      {disponivel === false && <p className="aviso">A LÚCIDA está indisponível neste momento. O SOS e a jornada continuam funcionando.</p>}
      {conversa.length === 0 && (
        <div className="cartao suave">
          <p>Conte o que aconteceu, do jeito que vier. Por exemplo: "Ele visualizou e não respondeu, e eu fiquei com vontade de mandar mais uma mensagem."</p>
        </div>
      )}
      <ol className="mensagens" aria-live="polite">
        {conversa.map((m, i) => (
          <li key={i} className={m.role === "user" ? "msg pessoa" : "msg lucida"}>
            <span className="msg-autor">{m.role === "user" ? "Você" : "LÚCIDA"}</span>
            {m.content.split("\n\n").map((p, j) => <p key={j}>{p}</p>)}
          </li>
        ))}
        {enviando && <li className="msg lucida pensando">A LÚCIDA está pensando…</li>}
      </ol>
      {ultima?.safety && <ApoioHumano />}
      {ultima?.exercise_id && !ultima.safety && (
        <div className="cartao sugestao">
          <p>A LÚCIDA sugeriu um exercício. Você pode fazer agora, depois ou nunca.</p>
          <Link className="botao" href={destinoExercicio(ultima.exercise_id)}>Abrir: {rotuloExercicio(ultima.exercise_id)}</Link>
        </div>
      )}
      {erro && <p className="aviso" role="alert">{erro}</p>}
      {temSinalDeRisco(texto) && <ApoioHumano />}
      <div ref={fim} />
      <form className="compor" onSubmit={e => { e.preventDefault(); enviar(); }}>
        <label className="visualmente-oculto" htmlFor="lucida-texto">Sua mensagem para a LÚCIDA</label>
        <textarea id="lucida-texto" rows={3} maxLength={2000} value={texto} onChange={e => setTexto(e.target.value)} placeholder="Escreva aqui" />
        <div className="linha-botoes">
          <button className="botao" type="submit" disabled={enviando || !texto.trim()}>{enviando ? "Enviando…" : "Enviar"}</button>
          <button className="botao texto" type="button" onClick={() => { atualizar(e => ({ ...e, lucida: { ...e.lucida, conversa: [] } })); setUltima(null); }}>Nova conversa</button>
        </div>
        <label className="interruptor">
          <input type="checkbox" checked={enviarContexto} onChange={e => atualizar(s => ({ ...s, lucida: { ...s.lucida, enviarContexto: e.target.checked } }))} />
          <span>Enviar meu momento, o módulo atual e meu objetivo como contexto</span>
        </label>
      </form>
    </div>
  );
}
