import { type FC } from "react";
import A from "@/components/a";
import B from "@/components/b";
import "@/App.css";

const AppUser: FC = () => {
  return (
    <>
      <div className="container">
        <h1>Zustand Demo</h1>
        <div className="wraps">
          <A />
          <B />
        </div>
      </div>
    </>
  );
};

export default AppUser;
