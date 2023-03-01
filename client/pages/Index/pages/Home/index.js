import "./index.less";

import TextField from "@mui/material/TextField";
import { SearchForm } from "client/component/Form1";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import React, { memo } from "react";

const Html = () => (
  <div className="ant-form-item ant-form-item-with-help ant-form-item-has-error">
    <div className="ant-row ant-form-item-row">
      <div className="ant-col ant-col-4 ant-form-item-label">
        <label
          htmlFor="basic_name"
          className="ant-form-item-required"
          title="用户名称">
          用户名称
        </label>
      </div>

      <div className="ant-col ant-col-8 ant-form-item-control">
        <div className="ant-form-item-control-input">
          <div className="ant-form-item-control-input-content">
            <TextField
              id="outlined-basic"
              label="用户名称"
              variant="outlined"
              size="small"
            />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <div
            id="basic_name_help"
            className="ant-form-item-explain ant-form-item-explain-connected"
            role="alert">
            <div className="ant-form-item-explain-error">请输入用户名称</div>
          </div>
          <div style={{ width: "0", height: "24px" }}></div>
        </div>
      </div>
    </div>
    <div
      className="ant-form-item-margin-offset"
      style={{ marginBottom: "-24px" }}></div>
  </div>
);

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
          type: "textarea",
          span: 1,
          extra: "12312323",
          rules: [
            {
              // required: true,
              message: "请输入用户名或手机号或邮箱"
            },
            {
              validator: (rule, value) => {
                // if (
                //   checkUser(value) ||
                //   checkPhone(value) ||
                //   checkEmail(value)
                // ) {
                //   return Promise.resolve();
                // }
                return Promise.reject("格式不正确请重新输入");
              }
            }
          ],
          props: {
            required: true,
            placeholder: "请输入用户名/手机号/邮箱"
          }
        },
        {
          label: "角色ID",
          name: "id",
          type: "input",
          props: {
            required: true,
            placeholder: "请输入用户名/手机号/邮箱"
          },
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
          ]
        },
        {
          label: "select",
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
          ],
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
            required: true,
            multiple: true,
            placeholder: "请输入用户名/手机号/邮箱"
          }
        },
        {
          label: "select",
          name: "age1",
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
          ],
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
            required: true,
            // multiple: true,
            placeholder: "请输入用户名/手机号/邮箱"
          }
        },

        {
          label: "切换",
          name: "switch",
          type: "switch",
          props: {
            required: true,
            placeholder: "请输入用户名/手机号/邮箱"
          },
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
          options: [
            {
              label: "switch",
              value: true
            }
          ]
        },
        {
          label: "checkbox",
          name: "checkbox",
          type: "checkbox",
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
          ],
          props: {
            required: true,
            placeholder: "请输入用户名/手机号/邮箱"
          },
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
          ]
        },
        {
          label: "radio",
          name: "radio",
          type: "radio",
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
          ],
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
            required: true,
            placeholder: "请输入用户名/手机号/邮箱"
          }
        }
      ];
    };
    return (
      <div className="home">
        {/*
         <div className="title">《欢迎来到TO协同系统》</div>
         */}
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
        <div>
          <Html />
        </div>
      </div>
    );
  })
);
