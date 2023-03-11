// 路由配置
export default [
  {
    path: "/",
    exact: true,
    name: "~index", // 特殊路由
    entry: "/pages/Index/pages/Home",
    level: 2
  },

  {
    path: "/home",
    exact: true,
    name: "home", // 特殊路由
    entry: "/pages/Index/pages/Home",
    level: 2
  },

  {
    path: "/desktop",
    exact: true,
    name: "desktop",
    entry: "/pages/Index/pages/Desktop",
    level: 2
  }
];
