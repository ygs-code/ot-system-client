import "client/assets/css/base.less";
import "./index.less";

import { Button, Paper, TextField } from "@mui/material";
import { message } from "antd";
import { createUser } from "client/assets/js/request/index";
import FormItem from "client/component/FormItem";
import VerificationCode from "client/component/VerificationCode";
import { addRouterApi, toComponent } from "client/router";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import { createForm } from "rc-form";
import React from "react";

const Index = (props) => {
  const { pushRoute, routePaths, form } = props;

  const { getFieldValue, validateFields } = form;
  const onFinish = async (values) => {
    await createUser({
      type: 1,
      ...values
    });
    message.success("注册成功");
    setTimeout(() => {
      pushRoute(routePaths.logIn);
    }, 1500);
  };

  const onSubmit = async () => {
    validateFields((error, values) => {
      if (!error) {
        onFinish(values);
      } else {
        console.error(error);
      }
    });
  };

  return (
    <div className="log-in">
      <div className="content center">
        <Paper elevation={3} className="paper">
          <h3>《OT协同办公系统》 </h3>

          <FormItem
            className="margin-top-10"
            rules={[
              {
                required: true,
                message: "请输入用户名"
              },
              {
                validator: (rule, value) => {
                  if (checkUser(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("用户名必须最少为4位，并且以字母开头");
                }
              }
            ]}
            label="用户名"
            form={form}
            name="name">
            <TextField
              className="input-w"
              required
              placeholder="请输入用户名"
              variant="outlined"
            />
          </FormItem>

          <FormItem
            className="margin-top-10"
            rules={[
              {
                required: true,
                message: "请输入手机号"
              },
              {
                validator: (rule, value) => {
                  if (checkPhone(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("请输入正确的手机号码");
                }
              }
            ]}
            label="手机号"
            form={form}
            name="phone">
            <TextField
              className="input-w"
              required
              placeholder="请输入手机号"
              variant="outlined"
            />
          </FormItem>

          <FormItem
            className="margin-top-10"
            rules={[
              {
                required: true,
                message: "请输入邮箱"
              },
              {
                validator: (rule, value) => {
                  if (checkEmail(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("请输入正确的邮箱");
                }
              }
            ]}
            label="邮箱"
            form={form}
            name="email">
            <TextField
              className="input-w"
              required
              placeholder="请输入邮箱"
              variant="outlined"
            />
          </FormItem>

          <FormItem
            label="密码"
            name="password"
            className="margin-top-10"
            rules={[
              {
                required: true,
                message: "请输入密码"
              },
              {
                validator: (rule, value) => {
                  if (!checkPassword(value)) {
                    return Promise.reject(
                      "密码最少为8位，并且最少含有字母和数字组成"
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
            form={form}>
            <TextField
              className="input-w"
              required
              placeholder="请输入密码"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
          </FormItem>

          <FormItem
            label="确认密码"
            name="confirmPassword"
            className="margin-top-10"
            rules={[
              {
                required: true,
                message: "请输入密码"
              },
              {
                validator: (rule, value) => {
                  if (!checkPassword(value)) {
                    return Promise.reject(
                      "密码最少为8位，并且最少含有字母和数字组成"
                    );
                  } else if (value && getFieldValue("password") !== value) {
                    return Promise.reject("输入两次密码不相同，请重新输入");
                  }
                  return Promise.resolve();
                }
              }
            ]}
            form={form}>
            <TextField
              className="input-w"
              required
              placeholder="请输入密码"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
          </FormItem>

          <VerificationCode form={form} />
          <div className="buttons">
            <Button
              className="submit"
              variant="contained"
              onClick={() => {
                onSubmit();
              }}>
              确定
            </Button>
            <Button
              className="submit"
              variant="outlined"
              onClick={() => {
                pushRoute(routePaths.logIn);
                // historyPush({
                //   url: routePaths.LogIn
                // });
              }}>
              登录
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default toComponent(addRouterApi(createForm()(Index)));
