import { useState } from 'react';
import { Button, Flex, Typography } from 'antd';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Flex vertical align="center" gap={16} style={{ paddingTop: 80 }}>
      <Typography.Title level={3}>react-demo05-zustand</Typography.Title>
      <Button type="primary" onClick={() => setCount((c) => c + 1)}>
        antd 依赖可用，点击次数：{count}
      </Button>
    </Flex>
  );
}
