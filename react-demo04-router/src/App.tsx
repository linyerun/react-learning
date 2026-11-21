import { useState } from "react";
import { Button } from "antd";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: 24 }}>
      <h1>react-demo04-router</h1>
      <Button type="primary" onClick={() => setCount((c) => c + 1)}>
        count is {count}
      </Button>
    </div>
  );
}
