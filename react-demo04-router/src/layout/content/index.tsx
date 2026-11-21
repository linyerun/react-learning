import { Outlet, useNavigation } from "react-router";
import { Spin } from "antd";

export default function Content() {
  /**
   * <Outlet />
   * 它的作用是充当一个“占位符”，用于在父路由的布局中，渲染当前匹配到的子路由内容。
   * 这是 React Router 实现嵌套路由（Nested Routes）和布局复用的关键机制。
   *
   * HydrateFallback 只在冷启动(路由尚未 initialized)时生效；
   * 点击菜单跳转属于 pending navigation，router 会继续渲染上一屏已 commit 的
   * matches，所以 lazy 分包下载的 2s 内看不到占位，要靠 useNavigation 感知。
   * */
  const navigation = useNavigation();
  if (navigation.state === "loading")
    return (
      <Spin
        size={"large"}
        description={"Loading..."}
        style={{ display: "block", marginTop: 48 }}
      />
    );
  return <Outlet />;
}
