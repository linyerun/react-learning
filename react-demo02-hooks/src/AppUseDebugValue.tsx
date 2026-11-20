import React, { useState, useDebugValue } from "react";

const useCookie = (name: string, initialValue: string = "") => {
  const getCookie = () => {
    const match = document.cookie.match(
      new RegExp(`(^| )${name}=([^;]*)(;|$)`),
    );
    return match ? match[2] : initialValue;
  };
  const [cookie, setCookie] = useState(getCookie());
  const updateCookie = (value: string, options?: any) => {
    document.cookie = `${name}=${value};${options}`;
    setCookie(value);
  };
  const deleteCookie = () => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookie(initialValue);
  };
  // 如果把useDebugValue注释掉了,那么react developer tools就看不到这个值了
  useDebugValue(cookie, (value) => {
    return `cookie: ${value}`;
  });
  return [cookie, updateCookie, deleteCookie] as const;
};

const AppUseDebugValue: React.FC = () => {
  const [cookie, updateCookie, deleteCookie] = useCookie("key", "value");
  return (
    <div>
      <div>{cookie}</div>
      <button
        onClick={() => {
          updateCookie("update-value");
        }}
      >
        设置cookie
      </button>
      <button
        onClick={() => {
          deleteCookie();
        }}
      >
        删除cookie
      </button>
    </div>
  );
};

export default AppUseDebugValue;
