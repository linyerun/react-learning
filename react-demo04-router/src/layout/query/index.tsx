import { useSearchParams, useLocation } from "react-router";
import { Button } from "antd";

export default function Query() {
  const [query, setQuery] = useSearchParams();
  const location = useLocation();
  // const pp = new setQuery()
  return (
    <>
      <hr />
      <div>id:{query.get("id")}</div>
      <div>name:{query.get("name")}</div>
      <div>age:{query.get("age")}</div>
      {/*获取完整的参数字符串"?xxx=xxx"*/}
      <div>location: {location.search}</div>
      <hr />
      {/*全覆盖*/}
      <Button onClick={() => setQuery({ id: "2" })}>Update1</Button>
      {/*支持部分更新*/}
      <Button
        onClick={() =>
          setQuery((prev) => {
            prev.set("id", "3");
            return prev;
          })
        }
      >
        Update2
      </Button>
    </>
  );
}
