// 路由配置
export default [
  {
    path: "/office",
    exact: true,
    name: "office",
    entry: "/pages/Index/pages/office/index.js",
    level: 2,
    children: [
      {
        path: "/document",
        name: "document",
        entry: "/pages/Index/pages/office/pages/Document/index.js",
        level: 2,
        children: [
          {
            path: "/details/:action/:id?",
            name: "documentDetails",
            entry: "/pages/Index/pages/office/pages/Document/details/index.js",
            level: 2,
            children: []
          }
        ]
      }
    ]
  }
];
