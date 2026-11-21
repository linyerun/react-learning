import usePriceStore from "./store/price";
import { useEffect } from "react";
export default function App() {
  //直接解构使用即可 把他当做一个hook使用
  const { price, name, incPrice, decPrice, resetPrice, getPrice } =
    usePriceStore();
  useEffect(() => {
    console.log("App被渲染了");
  });
  return (
    <div>
      <p>名称: {name}</p>
      <p>价格: {price}</p>
      <button onClick={incPrice}>增加</button>
      <button onClick={decPrice}>减少</button>
      <button onClick={resetPrice}>重置</button>
      <button onClick={() => console.log(getPrice())}>获取</button>
    </div>
  );
}
