import { useReducer } from "react";

const initData = [
  { name: "小满(只)", price: 100, count: 1, id: 1, isEdit: false },
  { name: "中满(只)", price: 200, count: 1, id: 2, isEdit: false },
  { name: "大满(只)", price: 300, count: 1, id: 3, isEdit: false },
];

type List = typeof initData;

interface Action {
  type: "ADD" | "SUB" | "DELETE" | "EDIT" | "UPDATE_NAME";
  id: number;
  newName?: string;
}

function reducer(state: List, action: Action) {
  // 深拷贝state
  state = state.map((item) => ({ ...item }));

  // 找出要变更的目标
  const item = state.find((item) => item.id === action.id);
  if (!item) {
    return state;
  }

  // 执行动作
  switch (action.type) {
    case "ADD":
      item.count++;
      break;
    case "SUB":
      if (item.count > 1) {
        item.count--;
      }
      break;
    case "DELETE":
      state = state.filter((item) => item.id !== action.id);
      break;
    case "EDIT":
      item.isEdit = !item.isEdit;
      break;
    case "UPDATE_NAME":
      item.name = action.newName!;
      break;
  }

  // 返回执行完动作后的state
  return state;
}

export default function AppUseReducer() {
  /*
   * useReducer的用法:
   *  const [state, dispatch] = useReducer(reducer, initialArg, init?)
   *    - dispatch是一个函数, 运行传一个参数,然后reducer这个回调函数会拿到这个参数的内容
   *    - initialArg是state的初始值, init是参数初始值返回函数(可选的), init传了则不会使用initialArg
   *    - reducer是一个函数, (state, action)=>{}; state是之前的旧值, action是dispatch函数返回的值
   * */
  const [data, dispatch] = useReducer(reducer, initData);
  return (
    <>
      <table cellPadding={0} cellSpacing={0} width={600} border={1}>
        <thead>
          <tr>
            <th>物品</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td align="center">
                  {item.isEdit ? (
                    <input
                      onBlur={() => dispatch({ type: "EDIT", id: item.id })}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_NAME",
                          id: item.id,
                          newName: e.target.value,
                        })
                      }
                      value={item.name}
                    />
                  ) : (
                    <span>{item.name}</span>
                  )}
                </td>
                <td align="center">{item.price * item.count}</td>
                <td align="center">
                  <button
                    onClick={() => dispatch({ type: "SUB", id: item.id })}
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => dispatch({ type: "ADD", id: item.id })}
                  >
                    +
                  </button>
                </td>
                <td align="center">
                  <button
                    onClick={() => dispatch({ type: "EDIT", id: item.id })}
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => dispatch({ type: "DELETE", id: item.id })}
                  >
                    删除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td align="center">
              总价:
              {data.reduce((prev, next) => prev + next.price * next.count, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
