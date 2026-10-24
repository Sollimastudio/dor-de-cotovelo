import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ProvedorEstado } from "./lib/EstadoContexto.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorEstado>
      <App />
    </ProvedorEstado>
  </StrictMode>,
);
