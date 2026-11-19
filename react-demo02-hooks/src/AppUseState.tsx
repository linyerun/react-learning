import { useState } from "react";

function AppUseState() {
  /*
   * React 靠 Hook 的调用顺序 来匹配状态，而不是靠名字。
   * 任何可能改变调用次数/顺序的写法（条件、循环、嵌套函数）都会让状态错位，所以必须在组件顶层、每次渲染都无条件按相同顺序调用。
   * */

  /*
   *  useState使用说明: https://message163.github.io/react-docs/react/hooks/useState.html
   *    1.useState 接收一个参数, 即状态的初始值/初始化函数, 然后返回一个数组，其中包含两个元素: 当前的状态值和一个更新该状态的函数;
   *    2.useState更新机制: 异步更新, 先注册到队列等同步任务结束后再渲染到页面上, 未渲染前多次调用则只有最后一次更新的值有效
   *      - 正是因为有未渲染前的多次更新, 所以setVal时可以传入一个(prev)=>{}的回调函数,prev是上次待更新的值
   * */

  // 普通类型的更新
  const [val, setVal] = useState<string>("lyr"); // 字面量初始化方式
  // const [val, setVal] = useState(() => "lyr"); // 函数式初始化方式
  const changeSimple = () => {
    setVal((prev) => prev + "1");
    setVal(val + "1");
  };

  // 对象类型的更新
  const [obj, setObj] = useState(() => {
    return { name: "linyerun", age: 25 };
  });
  // const [obj, setObj] = useState({ name: "linyerun", age: 25 });
  const changeObj = () => {
    // 两种更新方式
    // setObj({ ...obj, name: obj.name + "1" });
    setObj(Object.assign({}, obj, { name: obj.name + "1" }));
  };

  // 数组类型的更新
  const [arr, setArr] = useState<number[]>([10]);
  const changeArr = () => {
    arr.push(1);
    setArr([...arr]);
  };

  return (
    <>
      <h1>val: {val}</h1>
      <button onClick={changeSimple}>change-val</button>
      <hr />
      <h1>obj: {JSON.stringify(obj)}</h1>
      <button onClick={changeObj}>change-obj</button>
      <hr />
      <h1>arr: [{arr.toString()}]</h1>
      <button onClick={changeArr}>change-arr</button>
    </>
  );
}

export default AppUseState;
