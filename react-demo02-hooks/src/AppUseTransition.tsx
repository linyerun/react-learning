import { useTransition, type ChangeEvent } from "react";
import { Input, Flex, List } from "antd";
import { useImmer } from "use-immer";

interface Item {
  id: number;
  name: string;
  address: string;
}

function AppUseTransition() {
  /*
   * isPending:告诉你是否存在待处理的 transition
   * startTransition: 里面只能存在同步逻辑, 使用此方法将状态更新标记为 transition降低渲染的优先级
   * */
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useImmer("");
  const [list, setList] = useImmer<Item[]>([]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 紧急渲染
    fetch(`/api/v1/list?keyword=${value}`)
      .then((res): Promise<{ list: Item[] }> => res.json())
      .then((data) => {
        const res = data?.list ?? [];

        // 使用过渡 useTransition
        startTransition(() => setList(res));

        //不使用过渡 useTransition
        // setList(res);
      });
  };
  return (
    <>
      <Flex>
        <Input
          value={inputValue}
          onChange={handleInputChange} // 实时更新
          placeholder="请输入关键词"
        />
      </Flex>
      {isPending ? (
        <div>loading...</div>
      ) : (
        <List
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.name} description={item.address} />
            </List.Item>
          )}
        />
      )}
      {/*{isPending ?? <div>loading...</div>}
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} description={item.address} />
          </List.Item>
        )}
      />*/}
    </>
  );
}

export default AppUseTransition;
