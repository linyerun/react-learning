import { createContext, useContext, useState } from "react";

interface IContext {
  theme: string;
  setTheme: (theme: string) => void;
}

const MyThemeContext = createContext<IContext>({} as IContext);

function Child() {
  const ctx = useContext(MyThemeContext);
  return (
    <>
      <div>子组件当前主题: {ctx.theme}</div>
      <div>
        <button onClick={() => ctx.setTheme("dark")}>变暗</button>
        <button onClick={() => ctx.setTheme("light")}>变亮</button>
      </div>
    </>
  );
}

function Parent() {
  const ctx = useContext(MyThemeContext);
  return (
    <>
      <div>父组件当前主题: {ctx.theme}</div>
      <div>
        <button onClick={() => ctx.setTheme("dark")}>变暗</button>
        <button onClick={() => ctx.setTheme("light")}>变亮</button>
      </div>
      <hr />
      <Child />
    </>
  );
}

function AppUseImperativeHandle() {
  const [theme, setTheme] = useState<string>("light");
  return (
    <>
      <div>
        <button onClick={() => setTheme("dark")}>变暗</button>
        <button onClick={() => setTheme("light")}>变亮</button>
      </div>
      <hr />
      <MyThemeContext
        value={{ theme: theme, setTheme: (theme: string) => setTheme(theme) }}
      >
        <Parent />
      </MyThemeContext>
    </>
  );
}

export default AppUseImperativeHandle;
