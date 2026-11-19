import { useEffect, useState } from "react";
import { Button } from "antd";

function AppUseEffect() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect中的回调函数会在组件完成渲染之后执行, 回调函数中返回的回调函数会在组件销毁时被调用
  // 除了传一个回调函数, 还可以传一个数组，数组的元素是响应式变量，这些变量触发的组件变化才调回调函数
  // 如果传的是空数组，那么回调函数只会被执行一次，就是初始化组件时执行一次
  useEffect(() => {
    console.log("AppUseEffect渲染完成");
    return () => {
      console.log("AppUseEffect被销毁");
    };
  }, [loading]);

  return (
    <>
      <div>count: {count}</div>
      <Button onClick={() => setCount(count + 1)}>count+1</Button>
      <hr />
      <Button onClick={() => setLoading(!loading)}>loading or not</Button>
      <div>{loading ? <div>loading</div> : <></>}</div>
    </>
  );
}

export default AppUseEffect;
