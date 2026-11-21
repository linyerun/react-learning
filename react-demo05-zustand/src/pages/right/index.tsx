import "../index.css";
import usePriceStore from "../../store/price";
export default function Right() {
  const { incPrice, decPrice, resetPrice } = usePriceStore();
  return (
    <div className="right">
      <h1>B组件</h1>
      <button onClick={incPrice}>增加+1</button>
      <button onClick={decPrice}>减少-1</button>
      <button onClick={resetPrice}>重置</button>
    </div>
  );
}
