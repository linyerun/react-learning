/**
 * 受控组件一般是指表单元素，表单的数据由React的 State 管理，更新数据时，需要手动调用setState()方法，更新数据。
 *
 * 非受控组件指的是该表单元素不受React的State管理，表单的数据由DOM管理。通过useRef()来获取表单元素的值。
 * */
import { useState, type ChangeEvent, useRef } from "react";

function AppControlOrNot() {
  const [value, setValue] = useState<string>("");
  const handleChange1 = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    console.dir(e.target.files);
    console.dir(inputRef.current?.files);
  };
  return (
    <>
      {/*受控组件演示*/}
      <input type="text" value={value} onChange={handleChange1} />
      <div>value: {value}</div>
      <hr />
      {/*非受控组件演示*/}
      <input type="file" ref={inputRef} onChange={handleChange2} />
    </>
  );
}

export default AppControlOrNot;
