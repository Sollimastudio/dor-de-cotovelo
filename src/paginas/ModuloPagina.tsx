import { Link } from "wouter";
import { modulo, modulos } from "../conteudo/modulos.ts";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { temSinalDeRisco } from "../lib/risco.ts";
import CampoExercicio from "../componentes/Campos.tsx";
import ApoioHumano from "../componentes/ApoioHumano.tsx";
import NaoEncontrada from "./NaoEncontrada.tsx";

export default function ModuloPagina({ id }: { id: string }) {
  const { estado, atualizar } = useEstado();
  const m = modulo(id);
  if (!m) return <NaoEncontrada />;
  const registro = estado.modulos[m.id] ?? { respostas: {} };
  const respostas = registro.respostas;
  const mudar = (campo: string, valor: string | string[] | number) =>
    atualizar(e => ({ ...e, modulos: { ...e.modulos, [m.id]: { ...(e.modulos[m.id] ?? { respostas: {} }), respostas: { ...(e.modulos[m.id]?.respostas ?? {}), [campo]: valor } } } }));
  const concluir = () => atualizar(e => ({ ...e, modulos: { ...e.modulos, [m.id]: { ...(e.modulos[m.id] ?? { respostas: {} }), concluidoEm: new Date().toISOString() } } }));
  const reabrir = () => atualizar(e => ({ ...e, modulos: { ...e.modulos, [m.id]: { respostas: e.modulos[m.id]?.respostas ?? {} } } }));
  const proximo = modulos.find(x => x.numero === m.numero + 1);
  const textos = Object.values(respostas).filter((v): v is string => typeof v === "string");
  const risco = temSinalDeRisco(...textos);

  return (
    <div className="pagina">
      <Link className="voltar" href="/jornada">← Minha Jornada</Link>
      <p className="sobretitulo">Módulo {m.numero} de 8</p>
      <h1>{m.titulo}</h1>
      <p className="destaque">{m.objetivo}</p>
      {m.abertura.map(p => <p key={p}>{p}</p>)}
      {risco && <ApoioHumano />}
      <form className="exercicio" onSubmit={e => { e.preventDefault(); concluir(); }}>
        {m.campos.map(c => (
          <CampoExercicio key={c.id} campo={c} valor={respostas[c.id]} mudar={v => mudar(c.id, v)} />
        ))}
        {m.aviso && <p className="aviso">{m.aviso}</p>}
        <div className="campo">
          <label className="campo-pergunta" htmlFor="campo-leva">O que você leva deste módulo?</label>
          <textarea id="campo-leva" rows={3} value={typeof respostas.leva === "string" ? respostas.leva : ""} onChange={e => mudar("leva", e.target.value)} placeholder="Uma frase basta." />
        </div>
        <p className="nota">Suas respostas são salvas automaticamente neste aparelho. Nenhum campo é obrigatório.</p>
        {!registro.concluidoEm && <button className="botao" type="submit">Concluir este módulo</button>}
      </form>
      {registro.concluidoEm && (
        <section className="cartao concluido-cartao" aria-live="polite">
          <p className="sobretitulo">Módulo concluído</p>
          <p>{m.resultado}</p>
          <div className="linha-botoes">
            {proximo ? <Link className="botao" href={`/jornada/${proximo.id}`}>Próximo: {proximo.titulo}</Link> : <Link className="botao" href="/progresso">Ver meu plano no Progresso</Link>}
            <Link className="botao secundario" href={`/lucida?modulo=${m.id}`}>Conversar com a LÚCIDA sobre isto</Link>
            <button className="botao texto" type="button" onClick={reabrir}>Continuar editando</button>
          </div>
        </section>
      )}
    </div>
  );
}
