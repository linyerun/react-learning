import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "@/App.tsx";
// import AppTrans from "@/AppTrans.tsx";
import AppControlOrNot from "@/AppControlOrNot.tsx";
import Modal from "@/components/modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<App />*/}
    {/*<AppTrans />*/}
    <AppControlOrNot />
    <Modal />
  </StrictMode>,
);
