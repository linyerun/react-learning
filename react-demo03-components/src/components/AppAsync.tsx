import { lazy, Suspense } from "react";

// 使用lazy之后打包时就会自动分包了, 加速初次页面渲染
const AsyncComponent = lazy(() => import("@/components/async"));

function AppAsync() {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <AsyncComponent />
      </Suspense>
    </>
  );
}

export default AppAsync;
