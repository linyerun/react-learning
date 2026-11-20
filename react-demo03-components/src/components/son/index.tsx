import type { ReactNode } from "react";
import { Button } from "antd";

interface IProps {
  title: string;
  content?: string;
  children?: ReactNode;
  callback?: (value: string) => void;
}

const defaultProps: Partial<IProps> = {
  content: "默认内容",
};

export function Son(props: IProps) {
  props = { ...defaultProps, ...props };
  return (
    <>
      <>
        {props.callback ? (
          <div>
            <Button onClick={() => props.callback!("我见过龙")}>
              传信息给父组件
            </Button>
          </div>
        ) : (
          <></>
        )}
      </>
      <div>title: {props.title}</div>
      <div>content: {props.content}</div>
      {/*把父组件在使用子组件时内部方法内容渲染出来*/}
      {props.children}
    </>
  );
}

export default Son;
