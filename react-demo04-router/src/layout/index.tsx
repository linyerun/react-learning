import Header from "./header";
import Menu from "./menu";
import Content from "./content";
import { Layout as AntdLayout } from "antd";

export default function Layout() {
  return (
    <AntdLayout>
      <AntdLayout.Sider>
        <Menu />
      </AntdLayout.Sider>
      <AntdLayout>
        <Header />
        <AntdLayout.Content>
          <Content />
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
}
