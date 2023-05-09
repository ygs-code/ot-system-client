// 配置不进行webpack打包的文件
const externals = {
  react: "React",
  "react-dom": "ReactDOM"
};

// 配置cdn引入
const cdn = {
  css: [],
  js: [
    "https://lib.baomitu.com/react/18.2.0/umd/react.production.min.js",
    "https://lib.baomitu.com/react-dom/18.2.0/umd/react-dom.production.min.js"
  ]
};

module.exports = {
  externals,
  cdn
};
