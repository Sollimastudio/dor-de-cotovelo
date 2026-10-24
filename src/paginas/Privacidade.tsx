import { useState } from "react";
import { useEstado } from "../lib/EstadoContexto.tsx";

export default function Privacidade() {
  const { estado, atualizar, apagar } = useEstado();
  const [confirmar, setConfirmar] = useState(false);
  const [apagado, setApagado] = useState(false);
  const exportar = () => {
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dor-de-cotovelo-meus-dados.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  };
  return (
    <div className="pagina">
      <p className="sobretitulo">Privacidade</p>
      <h1>Seus dados, sob o seu controle.</h1>
      <section>
        <h2>O que fica guardado, e onde</h2>
        <p>Seu momento, a avaliação, as respostas dos exercícios, os registros do SOS, as mensagens não enviadas, o progresso e o histórico da conversa com a LÚCIDA ficam <strong>só neste aparelho</strong>, no navegador. Não existe conta, cadastro nem cópia desses dados num servidor do Dor de Cotovelo.</p>
        <p>Quem tiver acesso a este aparelho e a este navegador pode ver esses dados. Se o aparelho é compartilhado, desligue o armazenamento abaixo ou apague tudo ao terminar.</p>
      </section>
      <section>
        <h2>O que vai para a LÚCIDA</h2>
        <p>Só depois que você concorda. Vão as mensagens da conversa atual e, se você deixar ligado, o seu momento, o módulo em que está e o seu objetivo. O servidor do Relacione-se repassa ao provedor de IA (Google Gemini) e não grava o texto da conversa; guarda apenas um registro técnico de uso, sem conteúdo, que é excluído a partir de 32 dias. O provedor processa as mensagens segundo a política dele.</p>
        <p>Relatos íntimos nunca são usados para publicidade.</p>
      </section>
      <section className="cartao suave">
        <h2>Seus controles</h2>
        <label className="interruptor">
          <input type="checkbox" checked={estado.guardar} onChange={e => atualizar(s => ({ ...s, guardar: e.target.checked }))} />
          <span>Guardar meus dados neste aparelho. Desligado, tudo some ao fechar a página.</span>
        </label>
        <div className="linha-botoes">
          <button className="botao secundario" type="button" onClick={exportar}>Baixar uma cópia dos meus dados</button>
          {!confirmar ? (
            <button className="botao alerta" type="button" onClick={() => setConfirmar(true)}>Apagar tudo</button>
          ) : (
            <button className="botao alerta" type="button" onClick={() => { apagar(); setConfirmar(false); setApagado(true); }}>Confirmar: apagar tudo deste aparelho</button>
          )}
        </div>
        {apagado && <p role="status">Tudo foi apagado deste aparelho.</p>}
      </section>
      <section>
        <h2>Limites do apoio digital</h2>
        <p>O Dor de Cotovelo é apoio educativo e reflexivo. Não diagnostica, não substitui atendimento psicológico, médico ou jurídico e não é serviço de emergência. Em perigo, ligue 190 (polícia), 192 (SAMU), 180 (Central de Atendimento à Mulher) ou 188 (CVV).</p>
      </section>
    </div>
  );
}
