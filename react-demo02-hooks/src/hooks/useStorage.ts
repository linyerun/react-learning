import { useSyncExternalStore } from "react";

export const useStorage = <V>(key: string, defaultValue: V) => {
  const subscribe = (callback: () => void) => {
    // 订阅storage, 触发订阅之后就会调用callback,这样react内部感知到之后就会调用getSnapshot获取数据，与之前的数据比较不等后重新渲染组件
    // 下面这个事件会在我们手动操作浏览器改localStorage时触发
    window.addEventListener("storage", (e) => {
      console.log("storage event 触发了", e);
      callback();
    });
    // 取消订阅
    return () => {
      window.removeEventListener("storage", callback);
    };
  };
  const getSnapshot = () => {
    const data = localStorage.getItem(key);
    if (!data) {
      return defaultValue;
    }
    return JSON.parse(data) as V;
  };
  const retVal = useSyncExternalStore<V>(subscribe, getSnapshot);

  // 暴露方法运行用户设置值, 然后手动触发事件通知react更新组件数据
  const setValue = (val: V) => {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return [retVal, setValue] as const;
};
