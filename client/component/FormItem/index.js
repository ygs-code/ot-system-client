/*
 * @Author: your name
 * @Date: 2021-08-23 15:05:27
 * @LastEditTime: 2022-04-22 19:37:33
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/admin/src/common/component/VerificationCode/index.js
 */

import React, { cloneElement } from "react";

const Index = (props) => {
  const {
    name = "",
    label = "",
    form: { getFieldDecorator = () => {}, getFieldError = () => {} } = {},
    children,
    decoratorProps = {},
    initialValue,
    rules = [],
    className = "",
    style = {}
  } = props;

  return getFieldDecorator(name, {
    validateFirst: true, // 只校验一次
    initialValue,
    rules,
    ...decoratorProps
  })(
    cloneElement(children, {
      helperText: getFieldError(name) ? getFieldError(name).join(",") : null,
      label,
      error: getFieldError(name) || null
    })
  );
};

export default Index;
