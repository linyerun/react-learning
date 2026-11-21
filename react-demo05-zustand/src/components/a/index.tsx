import "../index.css";
import useUserStore from "@/store/user";
import { useEffect } from "react";
export default function Left() {
  console.log("A组件渲染");
  const { name, age, hobby, setHobbyRap, setHobbyBasketball } = useUserStore();
  useEffect(() => {
    const unsubscribe = useUserStore.subscribe(
      (state) => [state.hobby.basketball, state.hobby.rap],
      (curr, prev) => {
        console.log(`[A组件]curr=${curr}, prevr=${prev}`);
      },
    );
    return () => {
      unsubscribe();
    };
  });
  return (
    <div className="left">
      <h1>A组件</h1>
      <div>
        <h3>{name}</h3>
        <div>
          年龄：<span>{age}</span>
        </div>
        <div>
          爱好1：<span>{hobby.sing}</span>
        </div>
        <div>
          爱好2：<span>{hobby.dance}</span>
        </div>
        <div>
          爱好3：<span>{hobby.rap}</span>
        </div>
        <div>
          爱好4：<span>{hobby.basketball}</span>
        </div>
        <button onClick={() => setHobbyRap("只因你太美")}>改变爱好rap</button>
        <button onClick={() => setHobbyBasketball("篮球")}>
          改变爱好basketball
        </button>
      </div>
    </div>
  );
}
