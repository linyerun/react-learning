import { useId } from "react";

/**
 * useId
 *    为组件生成唯一id, 每调用一次就递增一次
 *    _r_0_
 *    _r_1_
 *    _r_2_
 *    _r_3_
 *    ...
 * */

export const AppUseId = () => {
  const id = useId();
  console.log(useId());
  console.log(useId());
  console.log(useId());
  console.log(useId());
  return (
    <>
      <div>
        <label htmlFor={id}>聚焦在输入框</label>
      </div>
      <div>
        <input id={id} type="text" />
      </div>
    </>
  );
};

export default AppUseId;
