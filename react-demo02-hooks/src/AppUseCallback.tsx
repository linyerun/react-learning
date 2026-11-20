/**
 * useCallback: 用于缓存函数, 避免函数在组件渲染时被频繁创建
 * 入参
 *   - callback：回调函数
 *   - deps：依赖项数组，当依赖项发生变化时，回调函数会被重新创建，跟useEffect一样。
 * 返回值
 *   - 返回一个记忆化的回调函数，可以减少函数的创建次数，提高性能。
 * */
import { memo, useCallback, useState } from "react";

interface CardProps {
  user: User;
  setUserAge: (age: number) => void;
}

interface User {
  name: string;
  age: number;
  email: string;
}

const Card = memo<CardProps>(function ({ user, setUserAge }) {
  console.log("Card render"); // 每次父组件的 state 发生变化，子组件都会重新渲染
  const styles = {
    backgroundColor: "lightblue",
    padding: "20px",
    borderRadius: "10px",
    margin: "10px",
  };
  return (
    <>
      <div style={styles}>
        <h1>{user.name}</h1>
        <p>{user.age}</p>
        <p>{user.email}</p>
      </div>
      <div>
        <button onClick={() => setUserAge(user.age + 1)}>age+1</button>
      </div>
    </>
  );
});

function AppUseCallback() {
  const [user, setUser] = useState<User>({
    name: "张三",
    age: 18,
    email: "zhangsan@example.com",
  });

  const [search, setSearch] = useState("");

  const setUserAge = useCallback((age: number) => {
    setUser({ ...user, age: age });
  }, []);

  return (
    <>
      <h1>父组件</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
          改变user: age+1
        </button>
      </div>
      <hr />
      <Card user={user} setUserAge={setUserAge} />
    </>
  );
}

export default AppUseCallback;
