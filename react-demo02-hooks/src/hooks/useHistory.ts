import { useSyncExternalStore } from "react";

export const useHistory = () => {
  const subscribe = (callback: () => void) => {
    window.addEventListener("popstate", callback);
    return () => {
      window.removeEventListener("popstate", callback);
    };
  };
  const getSnapshot = () => {
    return window.location.href;
  };
  const push = (path: string) => {
    // window.history.pushState() 是 HTML5 History API 的核心方法，
    // 用于在不刷新页面的情况下修改浏览器地址栏 URL 并添加一条历史记录。
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  const replace = (path: string) => {
    window.history.replaceState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  const retVal = useSyncExternalStore(subscribe, getSnapshot);
  return [retVal, push, replace] as const;
};
