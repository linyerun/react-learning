import { useStorage } from "@/hooks/useStorage.ts";
import { useHistory } from "@/hooks/useHistory.ts";

const AppMyHooks = () => {
  const [cnt, setCnt] = useStorage("myCnt", 1);
  const [url, push, replace] = useHistory();
  return (
    <>
      <div>count: {cnt}</div>
      <button onClick={() => setCnt(cnt + 1)}>+1</button>
      <hr />
      <div>url: {url}</div>
      <button onClick={() => push("/aaa")}>跳转到aaa</button>
      <button onClick={() => replace("/bbb")}>跳转到bbb</button>
    </>
  );
};

export default AppMyHooks;
