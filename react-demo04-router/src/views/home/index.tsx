import { NavLink, useNavigate } from "react-router";
import { Button } from "antd";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <hr />
      <div>Home</div>
      <hr />
      <div>
        <NavLink to={"/about"}>跳转到About</NavLink>
      </div>
      <hr />
      <div>
        <Button onClick={() => navigate("/aaa")}>错误路由</Button>
      </div>
      <hr />
      <div>
        <Button onClick={() => navigate("/err")}>ErrPage</Button>
      </div>
    </>
  );
}
