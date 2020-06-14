export {};

declare global {
  interface IRouter {
    go(url: string): void;
    routes: IRoute[];
  }

  interface IRoute {
    name?: string;
    path: string;
    component: typeof Component;
  }
  
  interface IRouterOptions {
    routes: IRoute[];
    baseUrl?: string;
  }
}
