import type { Campo } from "../conteudo/modulos.ts";

type Valor = string | string[] | number | undefined;

/** Um campo de exercício: texto livre, escolha (uma ou várias) ou escala de 1 a 5. */
export default function CampoExercicio({ campo, valor, mudar }: { campo: Campo; valor: Valor; mudar: (v: string | string[] | number) => void }) {
  const id = `campo-${campo.id}`;
  return (
    <div className="campo">
      <label htmlFor={campo.tipo === "texto" ? id : undefined} id={`${id}-rotulo`} className="campo-pergunta">{campo.pergunta}</label>
      {campo.ajuda && <p className="campo-ajuda">{campo.ajuda}</p>}
      {campo.tipo === "texto" && (
        <textarea id={id} rows={3} value={typeof valor === "string" ? valor : ""} placeholder={campo.exemplo ? `Exemplo: ${campo.exemplo}` : "Escreva com as suas palavras"} onChange={e => mudar(e.target.value)} />
      )}
      {campo.tipo === "escolha" && (
        <div className="opcoes" role="group" aria-labelledby={`${id}-rotulo`}>
          {campo.opcoes.map(o => {
            const lista = Array.isArray(valor) ? valor : typeof valor === "string" && valor ? [valor] : [];
            const marcado = lista.includes(o);
            return (
              <button key={o} type="button" className={marcado ? "opcao marcada" : "opcao"} aria-pressed={marcado} onClick={() => mudar(campo.multipla ? (marcado ? lista.filter(x => x !== o) : [...lista, o]) : o)}>
                {o}
              </button>
            );
          })}
        </div>
      )}
      {campo.tipo === "escala" && (
        <div className="escala" role="radiogroup" aria-labelledby={`${id}-rotulo`}>
          <span>{campo.minimo}</span>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} type="button" role="radio" aria-checked={valor === n} className={valor === n ? "ponto marcado" : "ponto"} onClick={() => mudar(n)}>
              {n}
            </button>
          ))}
          <span>{campo.maximo}</span>
        </div>
      )}
    </div>
  );
}
