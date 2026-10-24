import { useState } from "react";
import { Link } from "wouter";
import { indicadores } from "../conteudo/sos.ts";
import { modulo, modulos } from "../conteudo/modulos.ts";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { modulosConcluidos, quedaMediaDoImpulso } from "../lib/estado.ts";

export default function Progresso() {
  const { estado, atualizar } = useEstado();
  const [valores, setValores] = useState<Record<string, number>>({});
  const [registrado, setRegistrado] = useState(false);
  const primeiro = estado.checkins[0];
  const ultimo = estado.checkins.at(-1);
  const queda = quedaMediaDoImpulso(estado);
  const plano = estado.modulos.m8?.respostas ?? {};
  const camposPlano = modulo("m8")!.campos.filter(c => typeof plano[c.id] === "string" && (plano[c.id] as string).trim());

  return (
    <div className="pagina">
      <p className="sobretitulo">Meu Progresso</p>
      <h1>O que mudou, contado por você.</h1>
      <p className="destaque">Aqui não existe nota de cura. São percepções suas, registradas quando você quiser, para você enxergar o caminho.</p>

      <section className="resumo">
        <div className="cartao"><strong>{modulosConcluidos(estado)}/8</strong><span>módulos concluídos</span></div>
        <div className="cartao"><strong>{estado.sos.length}</strong><span>vezes que você usou o SOS</span></div>
        <div className="cartao"><strong>{queda === null ? "—" : queda > 0 ? `−${queda}` : queda}</strong><span>variação média da urgência depois da pausa do SOS (0 a 10)</span></div>
        <div className="cartao"><strong>{estado.rascunhos.length}</strong><span>mensagens escritas e não enviadas</span></div>
      </section>

      <section>
        <h2>Como estou hoje</h2>
        <p className="nota">De 1 (quase nunca) a 5 (quase sempre). Pode pular qualquer item.</p>
        {indicadores.map(ind => (
          <div className="campo" key={ind.id}>
            <p className="campo-pergunta">{ind.rotulo}</p>
            <div className="escala" role="radiogroup" aria-label={ind.rotulo}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" role="radio" aria-checked={valores[ind.id] === n} className={valores[ind.id] === n ? "ponto marcado" : "ponto"} onClick={() => setValores(v => ({ ...v, [ind.id]: n }))}>{n}</button>
              ))}
            </div>
            {primeiro && ultimo && primeiro !== ultimo && typeof primeiro.valores[ind.id] === "number" && typeof ultimo.valores[ind.id] === "number" && (
              <p className="nota">Primeiro registro: {primeiro.valores[ind.id]} · último: {ultimo.valores[ind.id]}</p>
            )}
          </div>
        ))}
        <button className="botao" type="button" disabled={!Object.keys(valores).length} onClick={() => { atualizar(e => ({ ...e, checkins: [...e.checkins, { em: new Date().toISOString(), valores }] })); setValores({}); setRegistrado(true); }}>Registrar como estou hoje</button>
        {registrado && <p className="nota" role="status">Registrado. Volte quando quiser comparar.</p>}
        {estado.checkins.length > 0 && <p className="nota">{estado.checkins.length} registro(s) desde {new Date(estado.checkins[0].em).toLocaleDateString("pt-BR")}.</p>}
      </section>

      <section>
        <h2>Minha jornada</h2>
        <ul className="lista-simples">
          {modulos.map(m => (
            <li key={m.id}><Link href={`/jornada/${m.id}`}>{m.numero}. {m.titulo}</Link> {estado.modulos[m.id]?.concluidoEm ? "· concluído" : ""}</li>
          ))}
        </ul>
      </section>

      <section className="cartao suave">
        <h2>Meu plano para os dias difíceis</h2>
        {camposPlano.length ? (
          <dl className="plano">
            {camposPlano.map(c => (<div key={c.id}><dt>{c.pergunta}</dt><dd>{plano[c.id] as string}</dd></div>))}
          </dl>
        ) : (
          <p>O seu plano nasce no módulo 8. <Link href="/jornada/m8">Abrir Continuidade e prevenção de recaídas</Link>.</p>
        )}
        {estado.rede.length > 0 && <p><strong>Minha rede de apoio:</strong> {estado.rede.join(", ")}</p>}
      </section>

      <p className="nota">Seus dados ficam neste aparelho. <Link href="/privacidade">Exportar ou apagar tudo</Link>.</p>
    </div>
  );
}
