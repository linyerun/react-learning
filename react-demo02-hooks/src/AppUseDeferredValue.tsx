import { useDeferredValue } from "react";
import { useImmer } from "use-immer";
import { Input, List } from "antd";
import mockJS from "mockjs";

interface Item {
  name: number;
  address: string;
}

function AppUseDeferredValue() {
  /*
   * useDeferredValue主要关注点是单个值的延迟更新。它允许你把特定状态的更新标记为低优先级。
   * 对于高频更新的内容（如输入框、滚动等）非常有用，可以让 UI 更加流畅，避免由于频繁更新而导致的性能问题。
   * */
  const [val, setVal] = useImmer("");
  const [list] = useImmer<Item[]>(() => {
    return mockJS.mock({
      "list|10000": [
        {
          "id|+1": 1,
          name: "@natural",
          address: "@county(true)",
        },
      ],
    }).list;
  });
  const deferredQuery = useDeferredValue(val);
  const isStale = deferredQuery !== val; // 检查是否为延迟状态
  const findItem = () => {
    //过滤列表，仅在 deferredQuery 更新时触发
    return list.filter((item) => item.name.toString().includes(deferredQuery));
  };
  return (
    <div>
      <Input value={val} onChange={(e) => setVal(e.target.value)} />
      <List
        style={{ opacity: isStale ? "0.2" : "1", transition: "all 1s" }}
        dataSource={findItem()}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.address} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default AppUseDeferredValue;
