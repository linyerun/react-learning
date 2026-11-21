import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import AppPrice from "@/AppPrice.tsx";
import AppUser from "@/AppUser.tsx";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*<AppPrice />*/}
    <AppUser />
  </StrictMode>,
);
