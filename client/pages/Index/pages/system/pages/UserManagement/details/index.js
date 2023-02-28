import "./index.less";

import { message } from "antd";
import { editUser, getUserInfo } from "client/assets/js/request";
import FormPage from "client/component/FormPage";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { mapRedux } from "client/redux";
import { addRouterApi, routePaths } from "client/router";
import React from "react";

class Index extends FormPage {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    };
  }
  /**
   * 用于将从接口获取到的初始化数据，转换成form需要的格式
   * 这个函数需要在getInitData中手动调用，因此函数名不限于mapInitData
   */
  mapInitData = async (initData) => {
    return initData;
  };
  // 初始化值
  getInitialValues = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const { data: { user = {} } = {} } = await getUserInfo({
      id
    });

    return await this.mapInitData(user);
  };

  /**
   * 用于将form的字段值转换为接口需要的格式
   */
  mapSubmitData = (formData) => {
    return formData;
  };
  // 提交请求到接口
  onSubmitForm = async (formData) => {
    const {
      history: { back }
    } = this.props;
    const values = await this.mapSubmitData(formData);
    const { message: mgs } = await editUser({ ...values });
    message.success(mgs);
    setTimeout(() => {
      back();
    }, 500);
  };
  getFields = () => {
    const {
      match: {
        params: { action }
      }
    } = this.props;

    const readOnly = action === "view";

    return [
      {
        type: "section",
        title: "详情基本设置",
        items: [
          {
            label: "用户ID",
            name: "id",

            render: (props) => {
              const { value } = props;

              return <div>{value}</div>;
            },
            rules: []
          },
          {
            label: "用户名称",
            name: "name",
            type: "input",
            props: {
              showCount: true,
              maxLength: 20,
              readOnly
            },
            itemProps: {
              extra: "23432432443asdf"
            },
            rules: [
              {
                required: true,
                message: "请输入用户名称"
              }
            ]
          },
          {
            label: "邮箱地址",
            name: "email",
            type: "input",
            props: {
              showCount: true,
              maxLength: 100,
              readOnly
            },

            rules: [
              {
                required: true,
                message: "请输入邮箱地址"
              }
            ]
          },
          {
            label: "手机号码",
            name: "phone",
            type: "input",
            props: {
              showCount: true,
              maxLength: 11,
              readOnly
            },

            rules: [
              {
                required: true,
                message: "请输入手机号码"
              }
            ]
          },
          {
            label: "用户类型",
            name: "type",
            type: "select",
            props: {
              readOnly,
              options: [
                {
                  label: "管理员",
                  value: 1
                },
                {
                  label: "会员",
                  value: 2
                }
              ]
            },
            itemProps: {},

            rules: [
              {
                required: true,
                message: "请选择用户类型"
              }
            ]
          }
        ]
      }
    ];
  };

  componentDidMount() {}
  render() {
    return (
      <div className="form-page account-management-details">
        {this.renderForm()}
      </div>
    );
  }
}

export default mapRedux()(
  // 权限控制
  setBreadcrumbAndTitle({
    //设置面包屑和标题
    breadcrumb: [
      {
        label: "用户管理",
        path: routePaths.userManagement
      },
      {
        label: "详情"
      }
    ],
    title: "用户管理/详情"
  })(addRouterApi(Index))
);
