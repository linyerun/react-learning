import { Link, useRouteError } from "react-router";
import { type IError } from "@/types";

export default function NotFound() {
  // 获取路由异常跑出来的信息
  const errData = useRouteError() as IError;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <h1 style={{ fontSize: 96, color: "#1890ff", margin: 0 }}>404</h1>
      <p style={{ fontSize: 24, color: "#888", margin: "16px 0 0 0" }}>
        抱歉，您访问的页面不存在
      </p>
      {errData ? (
        <p style={{ fontSize: 24, color: "#888", margin: "16px 0 0 0" }}>
          {JSON.stringify(errData)}
        </p>
      ) : (
        <></>
      )}
      <Link
        to="/"
        style={{
          marginTop: 32,
          color: "#1890ff",
          fontSize: 18,
          textDecoration: "underline",
        }}
      >
        返回首页
      </Link>
    </div>
  );
}
