import "./index.less";

import img from "client/assets/img/404.png";
import Layout, { layout } from "client/component/Layout";
import React, { memo } from "react";

export default layout()((props) => {
  const {
    user: { user: { email, id, name, phone, type } = {} } = {},
    onClick = () => {}
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="container">
      <img src={img} />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a
        onClick={(e) => {
          const { origin } = window.location;
          console.log("props===", props);
          console.log("location===", window.location);

          window.location.href = origin;
          e.stopPropagation();
        }}
        className="btn btn-primary btn_blue">
        返回主页
      </a>
    </div>
  );
});
