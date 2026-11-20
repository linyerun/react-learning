import { createRoot, type Root } from "react-dom/client";
import "./index.css";

const Message = ({ msg }: { msg: string }) => {
  return <div>{msg}</div>;
};

interface Item {
  messageContainer: HTMLDivElement;
  root: Root;
}

const queue: Item[] = [];

window.onShow = (msg: string) => {
  // 创建一个div然后挂在到body下面
  const messageContainer = document.createElement("div");
  messageContainer.className = "message";
  messageContainer.style.top = `${queue.length * 50}px`;
  document.body.appendChild(messageContainer);

  // 在div中挂载我们的Message组件
  const root = createRoot(messageContainer);
  root.render(<Message msg={msg} />); //渲染组件
  queue.push({
    messageContainer,
    root,
  });

  //2秒后移除
  setTimeout(() => {
    const item = queue.find(
      (item) => item.messageContainer === messageContainer,
    )!;
    item.root.unmount(); //卸载
    document.body.removeChild(item.messageContainer);
    queue.splice(queue.indexOf(item), 1);
  }, 2000);
};

//声明扩充
declare global {
  interface Window {
    onShow: (msg: string) => void;
  }
}
