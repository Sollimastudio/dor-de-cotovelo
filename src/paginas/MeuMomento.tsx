import { useState } from "react";
import { Link, useLocation } from "wouter";
import { momentos } from "../conteudo/momentos.ts";
import { avaliacao } from "../conteudo/avaliacao.ts";
import { modulo } from "../conteudo/modulos.ts";
import { planoInicial } from "../lib/plano.ts";
import { temSinalDeRisco } from "../lib/risco.ts";
import { useEstado } from "../lib/EstadoContexto.tsx";
import ApoioHumano from "../componentes/ApoioHumano.tsx";

/** Meu Momento: escolha do momento, avaliação curta (uma pergunta por tela, pode pular) e plano inicial. */
export default function MeuMomento() {
  const { estado, atualizar } = useEstado();
  const [, ir] = useLocation();
  const [passo, setPasso] = useState(0); // 0 = momento, 1..5 = avaliação, 6 = objetivo, 7 = plano
  const total = avaliacao.length + 2;
  const a = estado.avaliacao;

  if (passo === 0)
    return (
      <div className="pagina">
        <p className="sobretitulo">Meu Momento · 1 de {total}</p>
        <h1>O que está doendo mais em você agora?</h1>
        <p className="nota">Pode marcar mais de uma opção.</p>
        <div className="opcoes coluna" role="group" aria-label="Seu momento">
          {momentos.map(m => {
            const marcado = estado.momento.includes(m.id);
            return (
              <button key={m.id} type="button" className={marcado ? "opcao marcada" : "opcao"} aria-pressed={marcado} onClick={() => atualizar(e => ({ ...e, momento: marcado ? e.momento.filter(x => x !== m.id) : [...e.momento, m.id] }))}>
                {m.rotulo}
              </button>
            );
          })}
        </div>
        <label className="campo-pergunta" htmlFor="momento-texto">Se quiser, conte com as suas palavras</label>
        <textarea id="momento-texto" rows={4} value={estado.momentoTexto} onChange={e => atualizar(s => ({ ...s, momentoTexto: e.target.value }))} placeholder="O que aconteceu, o que você sente, o que mais pesa." />
        {temSinalDeRisco(estado.momentoTexto) && <ApoioHumano />}
        <div className="linha-botoes">
          <button className="botao" type="button" onClick={() => setPasso(1)}>Continuar</button>
        </div>
      </div>
    );

  if (passo <= avaliacao.length) {
    const q = avaliacao[passo - 1];
    const valor = a[q.id];
    const escolher = (id: string) =>
      atualizar(e => {
        const atual = e.avaliacao[q.id];
        const novo = q.multipla ? (Array.isArray(atual) && atual.includes(id) ? atual.filter(x => x !== id) : [...(Array.isArray(atual) ? atual : []), id]) : id;
        return { ...e, avaliacao: { ...e.avaliacao, [q.id]: novo } };
      });
    return (
      <div className="pagina">
        <p className="sobretitulo">Meu Momento · {passo + 1} de {total}</p>
        <h1>{q.pergunta}</h1>
        {q.ajuda && <p className="nota">{q.ajuda}</p>}
        <div className="opcoes coluna" role="group" aria-label={q.pergunta}>
          {q.opcoes.map(o => {
            const marcado = Array.isArray(valor) ? valor.includes(o.id) : valor === o.id;
            return (
              <button key={o.id} type="button" className={marcado ? "opcao marcada" : "opcao"} aria-pressed={marcado} onClick={() => { escolher(o.id); if (!q.multipla) setPasso(passo + 1); }}>
                {o.rotulo}
              </button>
            );
          })}
        </div>
        <div className="linha-botoes">
          <button className="botao secundario" type="button" onClick={() => setPasso(passo - 1)}>Voltar</button>
          <button className="botao" type="button" onClick={() => setPasso(passo + 1)}>{valor && (!Array.isArray(valor) || valor.length) ? "Continuar" : "Pular"}</button>
        </div>
      </div>
    );
  }

  if (passo === avaliacao.length + 1)
    return (
      <div className="pagina">
        <p className="sobretitulo">Meu Momento · {total} de {total}</p>
        <h1>Qual é o seu objetivo, com as suas palavras?</h1>
        <p className="nota">Ele fica guardado neste aparelho. Se você permitir, a LÚCIDA também o recebe para conversar com você.</p>
        <textarea rows={4} value={a.objetivo ?? ""} onChange={e => atualizar(s => ({ ...s, avaliacao: { ...s.avaliacao, objetivo: e.target.value } }))} placeholder="Exemplo: parar de olhar as redes dele e voltar a dormir bem." aria-label="Seu objetivo" />
        <div className="linha-botoes">
          <button className="botao secundario" type="button" onClick={() => setPasso(passo - 1)}>Voltar</button>
          <button className="botao" type="button" onClick={() => { atualizar(e => ({ ...e, plano: planoInicial(e.momento, e.momentoTexto, e.avaliacao) })); setPasso(passo + 1); }}>Ver meu ponto de partida</button>
        </div>
      </div>
    );

  const plano = estado.plano ?? planoInicial(estado.momento, estado.momentoTexto, a);
  const inicio = plano.inicio === "sos" ? null : modulo(plano.inicio);
  return (
    <div className="pagina">
      <p className="sobretitulo">Seu ponto de partida</p>
      <h1>{plano.inicio === "sos" ? "Comece pelo SOS Emocional" : `Comece pelo módulo ${inicio?.numero}: ${inicio?.titulo}`}</h1>
      <p className="destaque">{plano.porque}</p>
      {plano.seguranca && <ApoioHumano />}
      {plano.apoioProfissional && !plano.seguranca && (
        <div className="cartao suave">
          <p>Pelo que você contou, isso está pesando bastante na sua rotina. Este app pode ajudar no dia a dia, e conversar com um profissional de saúde mental também pode ajudar muito. Isso não é diagnóstico: é cuidado.</p>
        </div>
      )}
      <p className="nota">Isto é uma sugestão de caminho, não um diagnóstico. Você pode seguir por qualquer módulo.</p>
      <div className="linha-botoes">
        <button className="botao" type="button" onClick={() => ir(plano.inicio === "sos" ? "/sos" : `/jornada/${plano.inicio}`)}>Começar agora</button>
        <Link className="botao secundario" href="/jornada">Ver toda a jornada</Link>
      </div>
      {plano.depois.length > 0 && (
        <p className="nota">Depois: {plano.depois.map(id => modulo(id)?.titulo).filter(Boolean).join(" · ")}.</p>
      )}
    </div>
  );
}
