import "./index.less";

import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
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
  memo(() => {
    return (
      <div className="home">
        <div className="title">《欢迎来到TO协同系统》</div>
      </div>
    );
  })
);
