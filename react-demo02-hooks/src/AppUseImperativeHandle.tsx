/**
 * ============================================================
 * useImperativeHandle 使用说明
 * ============================================================
 *
 * 【作用】
 *   在函数组件中，把自定义的命令式 API 暴露给父组件通过 ref 调用，
 *   而不是把内部 DOM 节点整个泄露出去（相当于封装一层门面）。
 *
 * 【回调执行时机（重点，别记错）】
 *   - render 阶段（组件函数体执行时）：只“注册”回调，不执行。
 *   - commit 阶段：DOM 更新后，进入 layout 阶段执行回调。
 *   - useImperativeHandle 的回调内部等价于 useLayoutEffect：
 *       同步执行、在浏览器 paint 之前。
 *   - 它和 useLayoutEffect 是“同一阶段”，不是固定先后关系；
 *     同一组件内谁先执行，取决于它们在代码里的【声明顺序】。
 *
 *   一次 commit 的时序：
 *     render（不执行任何 effect 回调）
 *       ↓
 *     commit - mutation（更新 DOM）
 *       ↓
 *     commit - layout 阶段：
 *       按声明顺序执行 useLayoutEffect / useImperativeHandle 的回调
 *       ↓
 *     浏览器 paint
 *       ↓
 *     passive 阶段：执行 useEffect 回调（通常异步）
 *
 *   跨组件（父子）顺序：
 *     子组件 layout 类回调（含 useImperativeHandle）
 *       → 父组件 layout 类回调
 *     子组件 useEffect → 父组件 useEffect
 *   所以父组件在 useLayoutEffect 里可以安全拿到子组件暴露的 ref 方法。
 *
 * 【deps（第三个参数）】
 *   - 不传：每次 commit（layout 阶段）都会重新执行回调，重新赋值 ref.current。
 *   - 传 []：只在挂载时执行一次，更新不执行。
 *   - 传 [a, b]：依赖变化时才执行。
 *
 * 【返回值要求】
 *   - 回调应返回一个对象（作为 ref.current 的值）或 null。
 *   - 不要返回 undefined，否则 ref.current 为 undefined，父组件调用会报错。
 *
 * 【常见坑】
 *   1. 闭包陷阱：回调里读了 state，但 deps 没包含该 state，
 *      会永远拿到初始值。读什么就依赖什么。
 *   2. 不传 deps 时若每次返回新对象，ref.current 引用会变，
 *      父组件若缓存 ref.current 需注意引用稳定性。
 *   3. 不要用 useEffect 去“模拟”暴露 ref 方法：
 *      useEffect 在 paint 后异步执行，父组件在 layout 阶段读 ref 会拿到 null/旧值。
 *   4. 这是逃生舱，优先用 props 回调/受控组件传递能力；
 *      只有聚焦、滚动、动画、播放器等命令式操作才适合暴露。
 *
 * 【React 19 变化】
 *   ref 可直接作为普通 prop 传给函数组件，不再强制 forwardRef，
 *   但 useImperativeHandle 的用法和时机不变。
 */

import {
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface ChildRef {
  name: string;
  count: number;
  addCount: () => void;
  subCount: () => void;
}

function Child({ ref }: { ref: Ref<ChildRef> }) {
  const [count, setCount] = useState(0);
  useImperativeHandle(ref, () => {
    console.log("子组件useImperativeHandle回调函数被触发");
    return {
      name: "child",
      count,
      addCount: () => setCount(count + 1),
      subCount: () => setCount(count - 1),
    };
  }, [count]);
  return (
    <>
      <h3>我是子组件</h3>
      <div>count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
      </div>
    </>
  );
}

function AppUseImperativeHandle() {
  const childRef = useRef<ChildRef>(null);
  const showRefInfo = () => {
    console.log(childRef.current);
  };
  useEffect(() => {
    console.log("父组件useEffect回调函数被触发");
    return () => {
      console.log("父组件useEffect回调函数返回的回调函数被触发");
    };
  });
  return (
    <>
      <h1>我是父组件</h1>
      <div>
        <button onClick={showRefInfo}>获取子组件信息</button>
        <button onClick={() => childRef.current?.addCount()}>
          子组件count+1
        </button>
        <button onClick={() => childRef.current?.subCount()}>
          子组件count-1
        </button>
        <hr />
        <Child ref={childRef} />
      </div>
    </>
  );
}

export default AppUseImperativeHandle;
