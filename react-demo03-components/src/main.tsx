import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "@/App.tsx";
// import AppTrans from "@/AppTrans.tsx";
// import AppControlOrNot from "@/AppControlOrNot.tsx";
// import Modal from "@/components/modal";
// import AppAsync from "@/AppAsync.tsx";
// import AppSuperUsage from "@/AppSuperUsage.tsx";
import CssComp from "@/components/csscomp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<App />*/}
    {/*<AppTrans />*/}
    {/*<AppControlOrNot />*/}
    {/*<Modal />*/}
    {/*<AppAsync />*/}
    {/*<AppSuperUsage />*/}
    <CssComp />
  </StrictMode>,
);
