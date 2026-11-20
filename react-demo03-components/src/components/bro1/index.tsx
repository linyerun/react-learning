import { Button } from "antd";

interface IParams {
  name: string;
}

declare global {
  interface Event {
    lyrEventParams: IParams;
  }
}

function Bro1() {
  // Bro1通过自定义window事件给Bro2传递数据
  const event = new Event("lyr-event"); // 不要和已有事件重名
  const clickHandle = (name: string) => {
    event.lyrEventParams = { name: name };
    window.dispatchEvent(event);
  };
  return (
    <>
      <div>Here is Bro1</div>
      <Button
        onClick={() => clickHandle("Hi~ Bro2, I'm Bro1, Nice to meet you.")}
      >
        给Bro2组件传递数据
      </Button>
      <hr />
    </>
  );
}

export default Bro1;
