import "../index.css";
import useUserStore from "../../store/user";
import { useShallow } from "zustand/react/shallow";
export default function Right() {
  console.log("B组件渲染");
  /**
   * useShallow 只检查顶层对象的引用是否变化，
   * 如果顶层对象的引用没有变化（即使其内部属性或子对象发生了变化，但这些变化不影响顶层对象的引用），
   * 使用 useShallow 的组件将不会重新渲染
   * */
  const { rap, name } = useUserStore(
    useShallow((state) => ({
      rap: state.hobby.rap,
      name: state.name,
    })),
  );
  return (
    <div className="right">
      <h1>B组件</h1>
      <div>
        <div>
          姓名：<span>{name}</span>
        </div>
        <div>
          rap：<span>{rap}</span>
        </div>
      </div>
    </div>
  );
}
