import { Link } from "wouter";
import { Check } from "lucide-react";
import { modulos } from "../conteudo/modulos.ts";
import { useEstado } from "../lib/EstadoContexto.tsx";

export default function Jornada() {
  const { estado } = useEstado();
  return (
    <div className="pagina">
      <p className="sobretitulo">Minha Jornada</p>
      <h1>Oito módulos, no seu ritmo.</h1>
      <p className="destaque">Não existe prazo para superar alguém. Você pode seguir a ordem, começar pelo ponto de partida sugerido ou ir direto ao que mais precisa hoje.</p>
      <ol className="lista-modulos">
        {modulos.map(m => {
          const r = estado.modulos[m.id];
          const situacao = r?.concluidoEm ? "Concluído" : r && Object.keys(r.respostas).length ? "Em andamento" : estado.plano?.inicio === m.id ? "Seu ponto de partida" : "";
          return (
            <li key={m.id}>
              <Link href={`/jornada/${m.id}`} className={r?.concluidoEm ? "modulo concluido" : "modulo"}>
                <span className="modulo-numero" aria-hidden="true">{r?.concluidoEm ? <Check size={18} /> : m.numero}</span>
                <span>
                  <strong>{m.titulo}</strong>
                  <small>{m.objetivo}</small>
                  {situacao && <em>{situacao}</em>}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
