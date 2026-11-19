import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import AppUseState from "./AppUseState.tsx";
// import AppUseReducer from "@/AppUseReducer.tsx";
// import AppImmer from "@/AppImmer.tsx";
import { AppMyHooks } from "@/AppMyHooks.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<AppUseState />*/}
    {/*<AppUseReducer />*/}
    {/*<AppImmer />*/}
    <AppMyHooks />
  </StrictMode>,
);
