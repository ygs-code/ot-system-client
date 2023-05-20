import "./index.less";

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, message } from "antd";
import { logOut } from "client/assets/js/request";
import Breadcrumb from "client/component/Breadcrumb";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import React from "react";

const { Header } = Layout;

export default mapRedux()(
  addRouterApi((props) => {
    const {
      collapsed,
      onChangeCollapsed = () => {},
      avatar = "",
      onClick = () => {},
      showOutlined = true,
      state: {
        breadcrumb: { items = [] } = {},
        user: {
          userInfo: { user: { id, name: nickname, phone: mobile } = {} } = {}
        } = {}
      } = {},
      routePaths,
      pushRoute
    } = props;
    console.log("props======================", props);
    return (
      <Header className={"site-layout-background"} style={{ padding: 0 }}>
        {showOutlined ? (
          collapsed ? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={onChangeCollapsed}
            />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={onChangeCollapsed} />
          )
        ) : null}

        <Breadcrumb data={items} />
        <div
          className={
            id
              ? "locale-switcher   dropdown-root-box "
              : "locale-switcher   dropdown-root-box dropdown-root-box-top"
          }>
          <Dropdown
            dropdownRender={() => {
              return (
                <div className="dropdown-box">
                  {id ? (
                    <ul
                      onClick={onClick.bind(null, "account")}
                      className="dropdown-select">
                      <li className="odd"> 用户</li>
                      <li>
                        <dl>
                          <dd>
                            <div>{nickname}</div>
                            <div>手机：{mobile}</div>
                          </dd>
                          <dd>
                            <RightOutlined />
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  ) : null}

                  <ul
                    onClick={async () => {
                      await logOut();
                      message.success("注销成功");
                      setTimeout(() => {
                        pushRoute(routePaths.logIn);
                      }, 1500);
                      onClick("logOut");
                    }}
                    className="dropdown-select">
                    <li>{id ? "退出登录" : "登录"}</li>
                    <li>{id ? <LogoutOutlined /> : <RightOutlined />}</li>
                  </ul>
                </div>
              );
            }}
            trigger={["click"]}
            // menu={{ items }}
            placement="bottomRight"
            arrow={true}>
            <div className="dropdown-link" onClick={(e) => e.preventDefault()}>
              {avatar ? (
                <img src={avatar} />
              ) : (
                <Avatar size="large" icon={<UserOutlined />} />
              )}
              <span className="account-name">{nickname} </span>
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  })
);
