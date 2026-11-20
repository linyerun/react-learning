import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "@/App.tsx";
import AppTrans from "@/AppTrans.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<App />*/}
    <AppTrans />
  </StrictMode>,
);
