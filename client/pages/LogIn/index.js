import "client/assets/css/base.less";
import "./index.less";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form, Input, message } from "antd";
import { login } from "client/assets/js/request/index";
import FormItem from "client/component/FormItem";
import VerificationCode from "client/component/VerificationCode";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import { createForm } from "rc-form";
import React, { useEffect, useState } from "react";

console.log("createForm====", createForm);
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Index = (props) => {
  const { pushRoute, routePaths, form } = props;
  const { getFieldDecorator, getFieldProps, validateFields, getFieldError } =
    form;
  /*
   {
    name:{
      value:123,
      error:"",
    }
   }


  */
  const [values, setValues] = useState({});

  const onFinish = async (values) => {
    const {
      dispatch: {
        user: { setUserInfo }
      }
    } = props;

    const { data } = await login(values);

    const { token } = data;

    localStorage.setItem("token", token);

    setUserInfo(data);

    message.success("登录成功");
    setTimeout(() => {
      pushRoute(routePaths.home);
    }, 1500);
  };

  const onSubmit = async () => {
    validateFields((error, value) => {
      console.log(error, value);
      debugger;
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {}, []);
  console.log("props==", props);
  console.log(
    "error=",
    getFieldError("name") ? getFieldError("name").join(",") : null
  );

  return (
    <div className="center log-in">
      <h3>《OT协同办公系统》 </h3>

      <FormItem
        className="margin-top-10"
        rules={[
          {
            required: true,
            message: "请输入用户名或手机号或邮箱"
          },
          {
            validator: (rule, value) => {
              if (checkUser(value) || checkPhone(value) || checkEmail(value)) {
                return Promise.resolve();
              }
              return Promise.reject("格式不正确请重新输入");
            }
          }
        ]}
        label="用户名/手机号/邮箱"
        form={props.form}
        name="name">
        <TextField
          className="input-w"
          required
          placeholder="请输入用户名/手机号/邮箱"
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
        form={props.form}>
        <TextField
          className="input-w"
          required
          placeholder="请输入密码"
          variant="outlined"
          type="password"
          autoComplete="current-password"
        />
      </FormItem>

      {/*验证码*/}
      <VerificationCode form={form} />
      <div className="buttons">
        <Button
          className="submit"
          onClick={() => {
            onSubmit();
          }}>
          登录
        </Button>

        <Button
          variant="contained"
          className="submit"
          onClick={() => {
            pushRoute(routePaths.register);
          }}>
          注册
        </Button>
      </div>
    </div>
  );
};

export default mapRedux()(
  addRouterApi(
    createForm({
      name: "LogIn"
    })(Index)
  )
);
