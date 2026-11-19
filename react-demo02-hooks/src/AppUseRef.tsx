import { useEffect, useRef, useState } from "react";
import { Button } from "antd";

/**
 * useRef注意事项
 * 1.组件在重新渲染的时候，useRef的值不会被重新初始化。
 * 2.改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。
 * 3.useRef的值不能作为useEffect等其他hooks的依赖项，因为它并不是一个响应式状态。
 * 4.useRef不能直接获取子组件的实例，需要使用forwardRef。
 * */

function AppUseRef() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (color: string) => {
    divRef.current!.style.background = color; // 这里是直接改变真实的dom,不是触发组件重新渲染
  };
  useEffect(() => {
    console.log("App UseRef 被渲染");
    return () => {
      console.log("App UseRef 被销毁");
    };
  });
  const [curSec, setCurSec] = useState(0);
  const timerRef = useRef<number>(null);
  const startSec = () => {
    console.log("Starting Sec");
    timerRef.current = setInterval(() => setCurSec((prev) => prev + 1), 1000);
  };
  const endSec = () => {
    if (timerRef.current) {
      console.log("Ending Sec");
      clearInterval(timerRef.current);
    }
  };
  return (
    <>
      <div ref={divRef}>道可，道非，常道！</div>
      <Button onClick={() => handleClick("red")}>变红</Button>
      <Button onClick={() => handleClick("green")}>变绿</Button>
      <hr />
      <div>
        <div>
          <Button onClick={startSec}>开始计时</Button>
          <Button onClick={endSec}>停止计时</Button>
        </div>
        <div>计时(秒): {curSec}</div>
      </div>
    </>
  );
}

export default AppUseRef;
