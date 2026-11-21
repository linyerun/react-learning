import { Breadcrumb } from "antd";
import { useMatches } from "react-router";
import type { IRouteHandle } from "@/types";

export default function Header() {
  /**
   * 标题从路由表的 handle 里取(取最深一层声明了 handle 的路由),
   * 这样刷新页面、直接输入 URL、分享链接都能正确显示;
   * 之前用 mitt 事件总线只能在"点击菜单"时才有值, 刷新后状态丢失。
   * */
  const title = useMatches()
    .map((m) => (m.handle as IRouteHandle | undefined)?.label)
    .filter(Boolean)
    .pop();

  return (
    <Breadcrumb
      items={[
        {
          title: title ?? "",
        },
      ]}
    />
  );
}
