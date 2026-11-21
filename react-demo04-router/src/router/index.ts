import { createBrowserRouter } from "react-router";
import { redirect, type RouteObject } from "react-router";
import type { IError, IRouteHandle } from "@/types";
import Home from "@/views/home";
import About from "@/views/about";
import NotFound from "@/components/notfound";
import Login from "@/views/login";
import Layout from "@/layout";
import Params from "@/layout/params";
import Query from "@/layout/query";
import State from "@/layout/state";
import LoaderAction from "@/views/loaderaction";

const isLogin = true;

// import函数是一个异步函数, 用于异步加载包, 这样就能实现打包时自动分包了

const routes: RouteObject[] = [
  {
    // path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
        handle: { label: "Home" } as IRouteHandle,
      },
      {
        path: "home",
        Component: Home,
        handle: { label: "Home" } as IRouteHandle,
      },
      {
        path: "about",
        Component: About,
        handle: { label: "About" } as IRouteHandle,
      },
      {
        path: "params/:id/:name/:age",
        Component: Params,
        handle: { label: "Params" } as IRouteHandle,
      },
      {
        path: "query",
        Component: Query,
        handle: { label: "Query" } as IRouteHandle,
      },
      {
        path: "/state",
        Component: State,
        handle: { label: "State" } as IRouteHandle,
      },
      {
        path: "/lazy",
        // 异步记载组件, 使用import之后打包时会自动分包
        handle: { label: "Lazy" } as IRouteHandle,
        lazy: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const LazyComp = await import("@/views/lazy");
          return {
            Component: LazyComp.default,
          };
        },
      },
      {
        path: "err",
        Component: About,
        loader: async () => {
          throw {
            message: "Not Found",
            status: 404,
            statusText: "Not Found",
            data: "132131",
          } as IError;
        },
        ErrorBoundary: NotFound,
        handle: { label: "Err" } as IRouteHandle,
      },
    ],
  },
  {
    path: "/demo",
    children: [
      {
        index: true,
        Component: Home,
        loader: () => {
          if (!isLogin) {
            console.log("aaa");
            // 这个redirect一定要配合我们这个loader去使用
            return redirect("/login");
          }
        },
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "err",
        Component: About,
        loader: async () => {
          throw {
            message: "Not Found",
            status: 404,
            statusText: "Not Found",
            data: "132131",
          } as IError;
        },
        ErrorBoundary: NotFound,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/loader/action",
    Component: LoaderAction,
    loader: async () => {
      // 模拟GET请求获取数据
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // 下面的数据就可以在组件中使用useLoaderData来获取
      return {
        data: {
          name: "lyr",
          age: 25,
        },
        message: "success",
      };
    },
    action: async ({ request }) => {
      // 模拟提交POST/PUT/DELETE请求
      const body = await request.json();
      console.log(request, body);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        message: "success",
      };
    },
  },
  // 路由匹配不到的路径就跳转到此页面
  {
    path: "*",
    Component: NotFound,
  },
];

/**
 * 使用HTML5的history API (pushState, replaceState, popState)
 * 浏览器URL比较纯净 (/search, /about, /user/123)
 * 需要服务器端支持(Nginx, Apache等)否则会刷新404
 * 使用场景：
 *    大多数现代浏览器环境
 *    需要服务器端支持
 *    需要URL美观
 * */
const browserRouter = createBrowserRouter(routes);
export default browserRouter;

/**
 * 使用URL的hash部分(#/search, #/about, #/user/123)
 * 不需要服务器端支持
 * 刷新页面不会丢失
 * 使用场景：
 *    静态站点托管例如(github pages, netlify, vercel)
 *    不需要服务器端支持
 * */
/*
import { createHashRouter } from "react-router";
const hashRouter = createHashRouter(routes);
export default hashRouter
*/

/**
 * 使用内存中的路由表
 * 刷新页面会丢失状态
 * 切换页面路由不显示URL
 * 使用场景：
 *    非浏览器环境例如(React Native, Electron)
 *    单元测试或者组件测试(Jest, Vitest)
 * */
/*
import { createMemoryRouter } from "react-router";
const memoryRouter = createMemoryRouter(routes);
export default memoryRouter;
*/
