import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { useEstado } from "../lib/EstadoContexto.tsx";
import { modulo, modulos } from "../conteudo/modulos.ts";
import { ecossistema } from "../conteudo/apoio.ts";
import { modulosConcluidos } from "../lib/estado.ts";

export default function Inicio() {
  const { estado } = useEstado();
  const plano = estado.plano;
  const proximo = modulos.find(m => !estado.modulos[m.id]?.concluidoEm);
  const recomendado = plano && plano.inicio !== "sos" && !estado.modulos[plano.inicio]?.concluidoEm ? modulo(plano.inicio) : proximo;
  return (
    <div className="pagina">
      <section className="abertura">
        <p className="sobretitulo">Para quando o amor dói</p>
        <h1>Você não precisa resolver toda a sua vida amorosa hoje.</h1>
        <p className="destaque">Vamos entender o que está acontecendo, cuidar do que você está sentindo e descobrir qual é o próximo passo mais consciente.</p>
        {plano ? (
          <div className="cartao continuar">
            <p className="sobretitulo">Seu caminho</p>
            <p>{plano.porque}</p>
            <div className="linha-botoes">
              {plano.inicio === "sos" && estado.sos.length === 0 ? (
                <Link className="botao" href="/sos">Abrir o SOS Emocional</Link>
              ) : recomendado ? (
                <Link className="botao" href={`/jornada/${recomendado.id}`}>Continuar: {recomendado.titulo}</Link>
              ) : (
                <Link className="botao" href="/progresso">Ver meu plano e meu progresso</Link>
              )}
              <Link className="botao secundario" href="/momento">Refazer meu momento</Link>
            </div>
            <p className="nota">{modulosConcluidos(estado)} de 8 módulos concluídos.</p>
          </div>
        ) : (
          <div className="linha-botoes">
            <Link className="botao" href="/momento">Começar pelo meu momento</Link>
            <Link className="botao secundario" href="/sos">Preciso de ajuda agora</Link>
          </div>
        )}
      </section>

      <section>
        <h2>O que você encontra aqui</h2>
        <ul className="areas">
          <li><strong>Meu Momento.</strong> Você conta o que está doendo e recebe um ponto de partida.</li>
          <li><strong>Minha Jornada.</strong> Oito módulos com exercícios, no seu ritmo, sem prazo para superar.</li>
          <li><strong>SOS Emocional.</strong> Para os minutos de impulso: antes de mandar a mensagem, de procurar, de voltar.</li>
          <li><strong>Converse com a LÚCIDA.</strong> A conselheira de reflexão de Sol Lima ajuda a separar fato, interpretação e esperança.</li>
          <li><strong>Meu Progresso.</strong> O que mudou, contado por você, sem nota de cura.</li>
        </ul>
      </section>

      <section className="cartao suave">
        <h2>O que este app é, e o que não é</h2>
        <p>É apoio para recuperar autonomia, discernimento e capacidade de escolha. Não é tratamento psicológico, não diagnostica e não promete reconciliação nem ensina a reconquistar alguém.</p>
        <p>O que você escreve fica guardado só neste aparelho. A LÚCIDA só recebe o que você enviar a ela, depois de você concordar. <Link href="/privacidade">Como cuidamos dos seus dados</Link>.</p>
      </section>

      <section>
        <h2>Para ir além</h2>
        <ul className="pontes">
          <li><a href={ecossistema.cronometro} target="_blank" rel="noopener noreferrer">Cronômetro do Silêncio, grátis <ArrowUpRight size={16} aria-hidden="true" /></a></li>
          <li><a href={ecossistema.canal} target="_blank" rel="noopener noreferrer">Canal Minutos Magnetus no Telegram, grátis <ArrowUpRight size={16} aria-hidden="true" /></a></li>
          <li><a href={ecossistema.magnetus} target="_blank" rel="noopener noreferrer">Magnetus: presença e escolhas em 15 dias <ArrowUpRight size={16} aria-hidden="true" /></a></li>
        </ul>
      </section>
    </div>
  );
}
