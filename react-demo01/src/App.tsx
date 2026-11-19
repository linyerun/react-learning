import "./App.css";

function App() {
  /*
   * jsx是js的语法扩展，允许在js中编写html代码;
   * tsx是在jsx的基础上支持了类型;
   * */

  /*
   * 语法: {}
   *  1.支持展示的变量: 字符串、数字、普通类型的数组、元素、三元表达式、API调用
   *  2.不支持对象的展示，可以JSON.stringify后展示
   *  3.事件通过小驼峰来, 如果需要传参, 使用箭头函数包一层才行
   *  4.如果需要函数支持泛型，只有一个泛型后面要加一个逗号, 两个以上就不需要了
   *  5.{}可以用于绑定属性
   * */

  const obj = { name: "lyr", age: 25 };

  const num = 12.31212;
  const flag = true;

  const clickEvent = <T,>(eventName: T) => {
    console.log(eventName);
  };

  const clsName = "cls-name";
  const idName = "id-name";
  const htmlVal = "<h1>哈哈哈哈</h1>";
  const data = ["golang", "java", "python", "typescript"];

  return (
    <>
      <div>字符串: {"lyr"}</div>
      <div>数字: {122}</div>
      <div>数组: {[1, 2, 3, true]}</div>
      <div>对象序列化: {JSON.stringify(obj)}</div>
      <div>方法调用: {num.toFixed(2)}</div>
      <div>三元表达式: {flag ? "yes" : "no"}</div>
      <div>{<h1>元素</h1>}</div>
      <div>日期: {new Date().getTime()}</div>
      {/*无法渲染boolean值*/}
      <div>{true}</div>
      <hr />
      <button onClick={() => clickEvent("on-click")}>点击</button>
      <hr />
      <div className={clsName}>cls-name</div>
      <div id={idName}>id-name</div>
      <div style={{ color: "red" }}>style-setting</div>
      <hr />
      {/*vue3 v-html的效果*/}
      <div dangerouslySetInnerHTML={{ __html: htmlVal }}></div>
      <hr />
      <div>
        {/*vue3 v-for的效果*/}
        {data.map((item) => (
          <h1>{item}</h1>
        ))}
      </div>
    </>
  );
}

export default App;
