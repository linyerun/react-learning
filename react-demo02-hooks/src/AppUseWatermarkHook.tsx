import React from "react";
import { useWatermark } from "./hooks/useWatermark";

const AppUseWatermarkHook: React.FC = () => {
  const defaultContent = "小满zs";

  const [updateWatermark, opts] = useWatermark({
    content: defaultContent,
  }); // 水印

  const update = (content: string) => {
    updateWatermark({
      content: content,
    });
  };

  return (
    <>
      <div>
        <div>{JSON.stringify(opts)}</div>
        <div>
          <button onClick={() => update("linyerun")}>linyerun-水印</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => update(defaultContent)}
          >
            水印复原
          </button>
        </div>
      </div>
    </>
  );
};

export default AppUseWatermarkHook;
