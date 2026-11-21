import "../index.css";
import usePriceStore from "../../store/price";
export default function Left() {
  const { incPrice, decPrice, resetPrice } = usePriceStore();
  return (
    <div className="left">
      <h1>A组件</h1>
      <button onClick={incPrice}>增加+1</button>
      <button onClick={decPrice}>减少-1</button>
      <button onClick={resetPrice}>重置</button>
    </div>
  );
}
