import { useEffect, useState } from "react";
import { Link } from "wouter";
import { escolhasSos, situacoesSos } from "../conteudo/sos.ts";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { temSinalDeRisco } from "../lib/risco.ts";
import ApoioHumano from "../componentes/ApoioHumano.tsx";

type Passo = "perigo" | "seguranca" | "identificar" | "acolher" | "pausar" | "depois" | "esclarecer" | "escolher" | "fim";

function Termometro({ valor, mudar, rotulo }: { valor?: number; mudar: (n: number) => void; rotulo: string }) {
  return (
    <div className="termometro" role="radiogroup" aria-label={rotulo}>
      {Array.from({ length: 11 }, (_, n) => (
        <button key={n} type="button" role="radio" aria-checked={valor === n} className={valor === n ? "ponto marcado" : "ponto"} onClick={() => mudar(n)}>{n}</button>
      ))}
      <span className="termometro-legenda"><span>calma</span><span>urgência máxima</span></span>
    </div>
  );
}

/** Respiração guiada: 4 segundos para entrar, 6 para sair. Pode ser pulada a qualquer momento. */
function Respiracao({ minutos, fim }: { minutos: number; fim: () => void }) {
  const [restante, setRestante] = useState(minutos * 60);
  useEffect(() => {
    if (restante <= 0) return fim();
    const t = setTimeout(() => setRestante(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [restante, fim]);
  const fase = (minutos * 60 - restante) % 10 < 4 ? "Entra o ar…" : "Solta devagar…";
  return (
    <div className="respiracao" aria-live="polite">
      <div className={fase.startsWith("Entra") ? "bolha entra" : "bolha sai"} aria-hidden="true" />
      <p className="fase">{fase}</p>
      <p className="nota">{Math.floor(restante / 60)}:{String(restante % 60).padStart(2, "0")}</p>
    </div>
  );
}

export default function Sos() {
  const { estado, atualizar } = useEstado();
  const [passo, setPasso] = useState<Passo>("perigo");
  const [situacao, setSituacao] = useState<string>("");
  const [detalhe, setDetalhe] = useState("");
  const [antes, setAntes] = useState<number>();
  const [depois, setDepois] = useState<number>();
  const [pausa, setPausa] = useState<number | null>(null);
  const [vontade, setVontade] = useState("");
  const [espera, setEspera] = useState("");
  const [consequencia, setConsequencia] = useState("");
  const [escolha, setEscolha] = useState<string>();
  const [nome, setNome] = useState("");
  const s = situacoesSos.find(x => x.id === situacao);
  const risco = temSinalDeRisco(detalhe, vontade, espera, consequencia);
  const registrar = (e: string) => {
    setEscolha(e);
    atualizar(st => ({ ...st, sos: [...st.sos, { em: new Date().toISOString(), situacao, antes, depois, escolha: e }] }));
    setPasso("fim");
  };

  return (
    <div className="pagina sos">
      <p className="sobretitulo">SOS Emocional</p>

      {passo === "perigo" && (
        <>
          <h1>Antes de tudo: você está em perigo agora?</h1>
          <p className="destaque">Por exemplo: sofreu ameaça ou violência, está com medo da reação de alguém, ou está pensando em se machucar.</p>
          <div className="opcoes coluna">
            <button type="button" className="opcao alerta" onClick={() => setPasso("seguranca")}>Sim, preciso de ajuda agora</button>
            <button type="button" className="opcao" onClick={() => setPasso("identificar")}>Não, mas estou mal e no impulso</button>
          </div>
        </>
      )}

      {passo === "seguranca" && (
        <>
          <h1>Você não precisa atravessar isso sozinha(o).</h1>
          <ApoioHumano titulo="Procure ajuda humana agora" />
          {estado.rede.length > 0 && <p className="destaque">Sua rede de apoio: {estado.rede.join(", ")}.</p>}
          <button type="button" className="botao secundario" onClick={() => setPasso("identificar")}>Estou em segurança e quero continuar o SOS</button>
        </>
      )}

      {passo === "identificar" && (
        <>
          <h1>O que aconteceu agora?</h1>
          <div className="opcoes coluna">
            {situacoesSos.map(o => (
              <button key={o.id} type="button" className={situacao === o.id ? "opcao marcada" : "opcao"} aria-pressed={situacao === o.id} onClick={() => setSituacao(o.id)}>{o.rotulo}</button>
            ))}
          </div>
          <label className="campo-pergunta" htmlFor="sos-detalhe">Se quiser, conte em uma frase</label>
          <textarea id="sos-detalhe" rows={3} value={detalhe} onChange={e => setDetalhe(e.target.value)} />
          {temSinalDeRisco(detalhe) && <ApoioHumano />}
          <button className="botao" type="button" disabled={!situacao} onClick={() => setPasso("acolher")}>Continuar</button>
        </>
      )}

      {passo === "acolher" && s && (
        <>
          <h1>{s.rotulo}.</h1>
          <p className="destaque">{s.acolhida}</p>
          <p className="campo-pergunta">De 0 a 10, qual o tamanho da urgência agora?</p>
          <Termometro valor={antes} mudar={setAntes} rotulo="Urgência antes da pausa" />
          <button className="botao" type="button" onClick={() => setPasso("pausar")}>Continuar</button>
        </>
      )}

      {passo === "pausar" && (
        <>
          <h1>Uma pausa curta, se você quiser.</h1>
          {pausa === null ? (
            <>
              <p className="destaque">Respirar mais devagar ajuda o corpo a sair do modo alarme. Escolha quanto tempo:</p>
              <div className="linha-botoes">
                {[1, 2, 3].map(n => <button key={n} type="button" className="botao secundario" onClick={() => setPausa(n)}>{n} min</button>)}
              </div>
              <button type="button" className="botao texto" onClick={() => setPasso("depois")}>Prefiro não fazer agora</button>
            </>
          ) : (
            <>
              <Respiracao minutos={pausa} fim={() => setPasso("depois")} />
              <button type="button" className="botao texto" onClick={() => setPasso("depois")}>Encerrar a pausa</button>
            </>
          )}
        </>
      )}

      {passo === "depois" && (
        <>
          <h1>E agora, de 0 a 10?</h1>
          <Termometro valor={depois} mudar={setDepois} rotulo="Urgência depois da pausa" />
          {typeof antes === "number" && typeof depois === "number" && depois < antes && <p className="destaque">A urgência baixou de {antes} para {depois}. Ela muda quando não é alimentada.</p>}
          {typeof antes === "number" && typeof depois === "number" && depois >= antes && <p className="destaque">Tudo bem se ainda está alto. Vamos olhar com calma para o que você está com vontade de fazer.</p>}
          <button className="botao" type="button" onClick={() => setPasso("esclarecer")}>Continuar</button>
        </>
      )}

      {passo === "esclarecer" && (
        <>
          <h1>O que você está com vontade de fazer?</h1>
          <textarea rows={3} aria-label="O que você está com vontade de fazer" value={vontade} onChange={e => setVontade(e.target.value)} placeholder="Exemplo: mandar uma mensagem perguntando por que ele sumiu." />
          <label className="campo-pergunta" htmlFor="sos-espera">O que você espera conseguir com isso?</label>
          <textarea id="sos-espera" rows={2} value={espera} onChange={e => setEspera(e.target.value)} />
          <label className="campo-pergunta" htmlFor="sos-consequencia">O que pode acontecer depois?</label>
          <textarea id="sos-consequencia" rows={2} value={consequencia} onChange={e => setConsequencia(e.target.value)} />
          {risco && <ApoioHumano />}
          <button className="botao" type="button" onClick={() => setPasso("escolher")}>Escolher o próximo passo</button>
        </>
      )}

      {passo === "escolher" && (
        <>
          <h1>Qual é o próximo passo pequeno e seguro?</h1>
          <p className="nota">Não existe resposta certa. A escolha é sua.</p>
          <div className="opcoes coluna">
            {escolhasSos.map(o => (
              <button key={o.id} type="button" className="opcao" onClick={() => registrar(o.id)}>{o.rotulo}</button>
            ))}
          </div>
        </>
      )}

      {passo === "fim" && (
        <>
          <h1>Você atravessou este momento.</h1>
          <p className="destaque">Sentir de novo daqui a pouco não apaga o que você fez agora. Você pode voltar ao SOS sempre que precisar.</p>
          {escolha === "esperar" && <p>Combine com você: daqui a 20 minutos, revisite a decisão. Enquanto isso, faça algo com as mãos ou saia do celular.</p>}
          {escolha === "rascunho" && <Link className="botao" href="/rascunho">Escrever a mensagem que não envio</Link>}
          {escolha === "lucida" && <Link className="botao" href="/lucida">Conversar com a LÚCIDA</Link>}
          {escolha === "maos" && <p>Lavar uma louça, arrumar uma gaveta, caminhar. O corpo ocupado ajuda a cabeça a desacelerar.</p>}
          {escolha === "agir" && <p>Se for agir, faça com a intenção que você escreveu e respeitando os seus limites. Depois, observe como se sente.</p>}
          {escolha === "alguem" && (
            <div className="cartao suave">
              {estado.rede.length ? <p>Sua rede de apoio: <strong>{estado.rede.join(", ")}</strong>. Mande uma mensagem só dizendo que precisa conversar.</p> : <p>Pense em uma pessoa de confiança. Se quiser, guarde o nome dela aqui para lembrar nos próximos momentos difíceis.</p>}
              <form className="linha-botoes" onSubmit={e => { e.preventDefault(); if (nome.trim()) { atualizar(st => ({ ...st, rede: [...st.rede, nome.trim()].slice(0, 8) })); setNome(""); } }}>
                <input aria-label="Nome de uma pessoa de confiança" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
                <button className="botao secundario" type="submit">Guardar</button>
              </form>
            </div>
          )}
          <div className="linha-botoes">
            <Link className="botao secundario" href="/">Voltar ao início</Link>
            <Link className="botao secundario" href="/jornada/m6">Módulo: Impulso não é ordem</Link>
          </div>
        </>
      )}
    </div>
  );
}
