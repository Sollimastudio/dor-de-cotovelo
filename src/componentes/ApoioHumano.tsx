import { Phone } from "lucide-react";
import { apoioHumano } from "../conteudo/apoio.ts";

/** Apoio humano: aparece sempre que houver sinal de risco. O app não é serviço de emergência. */
export default function ApoioHumano({ titulo = "Sua segurança vem primeiro" }: { titulo?: string }) {
  return (
    <section className="apoio" aria-labelledby="apoio-titulo" role="region">
      <h2 id="apoio-titulo">{titulo}</h2>
      <p>Se você está em perigo, sofreu ameaça ou violência, ou está pensando em se machucar, procure ajuda humana agora. Ligue para alguém de confiança e para o serviço certo:</p>
      <ul>
        {apoioHumano.map(a => (
          <li key={a.numero}>
            <a className="apoio-ligar" href={`tel:${a.numero}`}>
              <Phone size={18} aria-hidden="true" />
              <strong>{a.numero}</strong> {a.nome}
            </a>
            <span>{a.quando}</span>
          </li>
        ))}
      </ul>
      <p className="nota">O Dor de Cotovelo e a LÚCIDA não são serviços de emergência e não substituem atendimento profissional.</p>
    </section>
  );
}
