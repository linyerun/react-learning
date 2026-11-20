import Card from "@/components/card";
import "@/components/message";
import { Button } from "antd";

export default function App() {
  return (
    <>
      <div>
        <Button onClick={() => window.onShow("登录成功")}>提示登录成功</Button>
      </div>
      <hr />
      <Card />
      <Card />
      <Card />
    </>
  );
}
