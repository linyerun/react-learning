import { useLayoutEffect } from "react";

const AsyncComponent = () => {
  useLayoutEffect(() => {
    for (let i = 0; i < 300000; i++) {
      console.log(i);
    }
  });

  return <div>Async</div>;
};

export default AsyncComponent;
