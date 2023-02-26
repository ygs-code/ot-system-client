import "./index.less";

import { SearchForm } from "client/component/Form1";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
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
  memo((props) => {
    let shrinkLength = 5;
    const getSearchFields = () => {
      return [
        {
          label: "角色名称",
          name: "name",
          type: "radio",
          span: 1,
          rules: [
            {
              required: true,
              message: "请输入用户名或手机号或邮箱"
            },
            {
              validator: (rule, value) => {
                if (
                  checkUser(value) ||
                  checkPhone(value) ||
                  checkEmail(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("格式不正确请重新输入");
              }
            }
          ],
          props: {
            require: true,
            placeholder: "请输入用户名/手机号/邮箱"
          }
        },
        {
          label: "角色ID",
          name: "id",
          type: "input"
        },
        {
          label: "年纪",
          name: "age",
          type: "select",
          options: [
            {
              label: "1-10岁",
              value: "1-10"
            },
            {
              label: "11-20岁",
              value: "11-20"
            },
            {
              label: "21-30岁",
              value: "21-30"
            },
            {
              label: "31-40岁",
              value: "31-40"
            }
          ]
        },
        {
          label: "切换",
          name: "switch",
          type: "switch"
        }
      ];
    };
    return (
      <div className="home">
        <div className="title">《欢迎来到TO协同系统》</div>
        <SearchForm
          {...props}
          onConfirm={() => {}}
          onReset={(searchParams) => {
            // this.loadTableData(searchParams);
          }}
          shrinkLength={shrinkLength}
          fields={getSearchFields()}
          type="search"
          onReady={(form) => {
            // this.searchForm = form;
            // this.loadTableData();
          }}
        />
      </div>
    );
  })
);
