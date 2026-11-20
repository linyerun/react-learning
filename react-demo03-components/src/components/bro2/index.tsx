import { useState } from "react";

function Bro2() {
  const [name, setName] = useState("");
  window.addEventListener("lyr-event", (e) => {
    setName(e.lyrEventParams.name);
  });
  return (
    <>
      <div>Here is Bro2</div>
      <div>Bro1 send to here msg: {name}</div>
      <hr />
    </>
  );
}

export default Bro2;
