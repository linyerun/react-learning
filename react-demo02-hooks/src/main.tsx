import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import AppUseState from "./AppUseState.tsx";
// import AppUseReducer from "@/AppUseReducer.tsx";
// import AppImmer from "@/AppImmer.tsx";
// import AppMyHooks from "@/AppMyHooks.tsx";
// import AppUseTransition from "@/AppUseTransition.tsx";
// import AppUseDeferredValue from "@/AppUseDeferredValue.tsx";
// import AppUseEffect from "@/AppUseEffect.tsx";
// import AppUseLayoutEffect from "@/AppUseLayoutEffect.tsx";
import AppUseRef from "@/AppUseRef.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<AppUseState />*/}
    {/*<AppUseReducer />*/}
    {/*<AppImmer />*/}
    {/*<AppMyHooks />*/}
    {/*<AppUseTransition />*/}
    {/*<AppUseDeferredValue />*/}
    {/*<AppUseEffect />*/}
    {/*<AppUseLayoutEffect />*/}
    <AppUseRef />
  </StrictMode>,
);
