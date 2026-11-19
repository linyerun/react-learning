/*
function useImmer<S>(
  initialState: S | (() => S)
): [
  S,
  (f: (draft: Draft<S>) => void | S) => void
]
参数: (initialState: S | (() => S))
返回值: [S, (f: (draft: Draft<S>) => void | S) => void]
- (f: (draft: Draft<S>) => void | S) => void这个函数的参数: (draft: Draft<S>) => void、S

参数：
  initialState: 初始状态值或返回初始状态的函数
返回值：
  state: 当前状态
  setState: 更新状态的函数

useState的拓展, 在内部帮我们做了对象的处理, 无需我们手动处理了。
*/

/*
function useImmerReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & InitializerArg<R>,
  initializer?: (arg: I & InitializerArg<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]


useReducer的拓展, 在内部帮我们做了对象的处理, 无需我们手动处理了。
* */

// 作用: 它让你可以像修改可变数据一样来修改不可变数据
import { useImmer, useImmerReducer } from "use-immer";

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
  // 找出要变更的目标
  const item = state.find((item) => item.id === action.id);
  if (!item) {
    return;
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
      const idx = state.findIndex((item) => item.id === action.id);
      state.splice(idx, 1);
      break;
    case "EDIT":
      item.isEdit = !item.isEdit;
      break;
    case "UPDATE_NAME":
      item.name = action.newName!;
      break;
  }
}

export default function AppImmer() {
  const [data, dispatch] = useImmerReducer(reducer, initData);
  const [obj, setObj] = useImmer({ name: "lyr", age: 21 });
  const changeObj1 = () => {
    setObj((obj) => {
      obj.age++;
      obj.name += "1";
    });
  };
  const changeObj2 = () => {
    setObj({ name: obj.name + "1", age: obj.age + 1 });
  };
  return (
    <>
      <div>
        <div>obj: {JSON.stringify(obj)}</div>
        <button onClick={changeObj1}>改变obj1</button>
        <button onClick={changeObj2}>改变obj2</button>
      </div>
      <hr />
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
