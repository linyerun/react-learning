export interface IError {
  message: string;
  status: number;
  statusText: string;
  data: string;
}

// 挂在路由 handle 上的自定义元数据, 用 useMatches 读取
export interface IRouteHandle {
  label: string;
}
