import { Link } from "react-router";

export default function About() {
  return (
    <>
      <hr />
      <div>About</div>
      <hr />
      <div>
        <Link to={"/"}>跳转到Home</Link>
      </div>
    </>
  );
}
