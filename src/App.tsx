import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Moldura from "./componentes/Moldura.tsx";
import Inicio from "./paginas/Inicio.tsx";
import MeuMomento from "./paginas/MeuMomento.tsx";
import Jornada from "./paginas/Jornada.tsx";
import ModuloPagina from "./paginas/ModuloPagina.tsx";
import Sos from "./paginas/Sos.tsx";
import Rascunho from "./paginas/Rascunho.tsx";
import Lucida from "./paginas/Lucida.tsx";
import Progresso from "./paginas/Progresso.tsx";
import Privacidade from "./paginas/Privacidade.tsx";
import NaoEncontrada from "./paginas/NaoEncontrada.tsx";

function AoTrocarDePagina() {
  const [local] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("conteudo")?.focus({ preventScroll: true });
  }, [local]);
  return null;
}

export default function App() {
  return (
    <Moldura>
      <AoTrocarDePagina />
      <Switch>
        <Route path="/" component={Inicio} />
        <Route path="/momento" component={MeuMomento} />
        <Route path="/jornada" component={Jornada} />
        <Route path="/jornada/:id">{p => <ModuloPagina id={p.id} />}</Route>
        <Route path="/sos" component={Sos} />
        <Route path="/rascunho" component={Rascunho} />
        <Route path="/lucida" component={Lucida} />
        <Route path="/progresso" component={Progresso} />
        <Route path="/privacidade" component={Privacidade} />
        <Route component={NaoEncontrada} />
      </Switch>
    </Moldura>
  );
}
