import { type FC } from "react";

const Role: { [key: IRole]: string } = {
  ADMIN: "admin",
  USER: "user",
} as const;

type IRole = string;

function isAuthorized(role: IRole) {
  return role === Role.ADMIN;
}

const withAuthorization = (role: IRole) => {
  return (Component: FC): FC => {
    return (props: any) => {
      if (isAuthorized(role)) {
        return <Component {...props} />;
      }
      return <div>抱歉，您没有权限访问此页面</div>;
    };
  };
};

const AdminPage = withAuthorization(Role.ADMIN)(() => {
  return <div>管理员页面</div>; //有权限输出
});

const UserPage = withAuthorization(Role.USER)(() => {
  return <div>用户页面</div>; //没有权限不输出
});

function AppSuperUsage() {
  return (
    <>
      <AdminPage />
      <hr />
      <UserPage />
    </>
  );
}

export default AppSuperUsage;
