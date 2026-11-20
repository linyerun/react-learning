import Son from "@/components/son";
import { useState } from "react";
import Bro1 from "@/components/bro1";
import Bro2 from "@/components/bro2";

export function Parent() {
  const [val, setVal] = useState("");
  const callback = (val: string) => {
    setVal(val);
  };
  return (
    <>
      <Son title={"java"} />
      <hr />
      <Son title={"golang"} content={"go是编译型语言"} />
      <hr />
      <Son title={"React"} callback={callback}>
        <h1>React+Typescript</h1>
        <h1>Vue+Typescript</h1>
      </Son>
      <hr />
      <div>子组件给父组件传的值: {val}</div>
      <hr />
      <Bro1 />
      <Bro2 />
    </>
  );
}

export default Parent;
