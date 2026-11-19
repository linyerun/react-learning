import { useLayoutEffect, type UIEvent } from "react";

/**
 * =====================================================================
 * useLayoutEffect 与 useEffect 的区别
 * =====================================================================
 *
 * 1. 执行时机 (Timing)
 *    - useLayoutEffect: 浏览器完成布局和绘制【之前】执行副作用
 *    - useEffect:       浏览器完成布局和绘制【之后】执行副作用
 *
 * 2. 执行方式 (Execution Mode)
 *    - useLayoutEffect: 同步执行 (Synchronous)
 *    - useEffect:       异步执行 (Asynchronous)
 *
 * 3. DOM渲染 (DOM Rendering)
 *    - useLayoutEffect: 阻塞 DOM 渲染
 *    - useEffect:       不阻塞 DOM 渲染
 *
 * ---------------------------------------------------------------------
 * 补充说明：回调函数中返回的 cleanup 函数执行时机区别
 * ---------------------------------------------------------------------
 *
 * 4. Cleanup (清除函数) 执行时机
 *    - useLayoutEffect:
 *      在【下一次】DOM 更新完成（已应用到 DOM）后，但在浏览器【重新绘制之前】同步执行。
 *      (即：React 更新 DOM -> 执行上一次的 cleanup -> 执行本次的 effect -> 浏览器绘制)
 *
 *    - useEffect:
 *      在【下一次】DOM 更新完成并且浏览器【绘制完成之后】异步执行。
 *      (即：React 更新 DOM -> 浏览器绘制 -> 执行上一次的 cleanup -> 执行本次的 effect)
 *
 * 5. 组件卸载 (Unmount) 时的执行时机
 *    - useLayoutEffect: 在组件被移除出 DOM 树时，【同步】执行 cleanup，在浏览器绘制变化之前。
 *    - useEffect:       在组件被移除出 DOM 树后，【异步】执行 cleanup，不阻塞浏览器绘制。
 */

/*function AppUseLayoutEffect() {
  const [count, setCount] = useState(0);

  //不阻塞DOM
  /!*useEffect(() => {
    for (let i = 0; i < 50000; i++) {
      //console.log(i);
      setCount((count) => count + 1);
    }
  }, []);*!/

  //阻塞DOM
  /!*useLayoutEffect(() => {
    for (let i = 0; i < 30000; i++) {
      //console.log(i);
      setCount((count) => count + 1);
    }
  }, []);*!/

  return (
    <div>
      <div>app </div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{index}</div>
      ))}
    </div>
  );
}*/

// 案例: 让滚动条在刷新之后还保持在原位置
function AppUseLayoutEffect() {
  const scrollHandler = (e: UIEvent<HTMLUListElement>) => {
    window.history.replaceState(null, "", `?top=${e.currentTarget.scrollTop}`);
  };

  useLayoutEffect(() => {
    const ul = document.getElementById("ul-list") as HTMLUListElement;
    ul.scrollTop = Number(window.location.search.split("=")[1] ?? 0);
  }, []);

  return (
    <>
      <ul
        id="ul-list"
        style={{ height: "500px", overflowY: "scroll" }}
        onScroll={scrollHandler}
      >
        {Array.from({ length: 500 }, (_, i) => (
          <li key={i}>Item {i + 1}</li>
        ))}
      </ul>
    </>
  );
}

export default AppUseLayoutEffect;
