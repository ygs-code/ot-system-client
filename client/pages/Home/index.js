import "./index.less";

// import TextField from "@mui/material/TextField";
// import { SearchForm } from "client/component/Form1";
// import Message from "client/component/Message";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
// import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import React, { memo } from "react";

// 权限控制
export default setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "主页"
    }
  ],
  title: "主页"
})(
  memo(() =>
    // props
    {
      return <div className="home">主页</div>;
    }
  )
);
