import { Menu as AntdMenu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";

export default function Menu() {
  const navigate = useNavigate(); //编程式导航
  const handleClick: MenuProps["onClick"] = (info) => {
    // 点击菜单项时，导航到对应的页面
    if (info.itemData.label == "State") {
      // state是基于内存来传递参数的，单会话内保持，新开一个页面访问就报错了
      navigate("/state", {
        state: {
          id: 10,
          name: "lyr",
          age: 25,
        },
      });
    } else {
      navigate(info.key);
    }
  };
  const menuItems = [
    {
      key: "/home",
      label: "Home",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/about",
      label: "About",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/params/1/lyr/25",
      label: "Params",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/query?id=1&name=lyr&age=25",
      label: "Query",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/state",
      label: "State",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/lazy",
      label: "Lazy",
      icon: <AppstoreOutlined />,
    },
  ];
  return (
    <AntdMenu
      onClick={handleClick}
      style={{ height: "100vh" }}
      items={menuItems}
    />
  );
}
