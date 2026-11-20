import { useMemo, useState, memo } from "react";

/**
 * useMemo的执行时机


render 阶段：
  执行组件函数体 → 按顺序执行 hooks → useMemo factory（deps 变时）(同步)
    ↓
commit 阶段：
  mutation（更新 DOM）→ layout（useLayoutEffect(同步) / useImperativeHandle(同步)）
    ↓
paint
    ↓
passive（useEffect(异步)）

 * useMemo的使用
 *
 * 入参
 *    1.回调函数:Function：返回需要缓存的值
 *    2.依赖项:Array：依赖项发生变化时，回调函数会重新执行(执行时机跟useEffect类似)
 *      - 如果依赖项是个空数组，那么 useMemo 的回调函数只会执行一次
 * 返回值
 *    1.返回需要缓存的值(返回之后就不是函数了)
 *    2.指定依赖项，当依赖项发生变化时，useMemo的回调函数会执行
* */

interface User {
  name: string;
  age: number;
  email: string;
}

interface CardProps {
  user: User;
}

// 当我们使用 memo 缓存后，只有 user 发生变化时，组件才会重新渲染。
const Card = memo<CardProps>(function ({ user }) {
  console.log("Card render"); // 每次父组件的 state 发生变化，子组件都会重新渲染
  const styles = {
    backgroundColor: "lightblue",
    padding: "20px",
    borderRadius: "10px",
    margin: "10px",
  };
  return (
    <div style={styles}>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
      <p>{user.email}</p>
    </div>
  );
});

// 如果没有memo,每次父组件重新渲染时这个子组件也被重新渲染,尽管它里面的内容没发生变化
/*const Card = function ({ user }: CardProps) {
  console.log("Card render"); // 每次父组件的 state 发生变化，子组件都会重新渲染
  const styles = {
    backgroundColor: "lightblue",
    padding: "20px",
    borderRadius: "10px",
    margin: "10px",
  };
  return (
    <div style={styles}>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
      <p>{user.email}</p>
    </div>
  );
};*/

function AppUseMemo() {
  const [user, setUser] = useState<User>({
    name: "张三",
    age: 18,
    email: "zhangsan@example.com",
  });
  const [search, setSearch] = useState("");

  const [goods, setGoods] = useState([
    { id: 1, name: "苹果", price: 10, count: 1 },
    { id: 2, name: "香蕉", price: 20, count: 1 },
    { id: 3, name: "橘子", price: 30, count: 1 },
  ]);
  const handleAdd = (id: number) => {
    setGoods(
      goods.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };
  const handleSub = (id: number) => {
    setGoods(
      goods.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item,
      ),
    );
  };

  // goods发生变化时触发回调函数
  const total = useMemo(() => {
    return goods.reduce((total, item) => total + item.price * item.count, 0);
  }, [goods]);

  return (
    <div>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price * item.count}</td>
              <td>
                <button onClick={() => handleAdd(item.id)}>+</button>
                <span>{item.count}</span>
                <button onClick={() => handleSub(item.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>总价：{total}</h2>
      <hr />
      <h1>父组件</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
          改变user: age+1
        </button>
      </div>
      <hr />
      <Card user={user} />
    </div>
  );
}

export default AppUseMemo;
