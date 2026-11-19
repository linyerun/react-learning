import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppUseState from "./AppUseState.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppUseState />
  </StrictMode>,
);
