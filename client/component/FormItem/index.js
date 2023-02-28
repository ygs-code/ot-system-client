/*
 * @Author: your name
 * @Date: 2021-08-23 15:05:27
 * @LastEditTime: 2022-04-22 19:37:33
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/admin/src/common/component/VerificationCode/index.js
 */

import React, { cloneElement } from "react";

let html = (
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
            <span className="ant-input-affix-wrapper ant-input-affix-wrapper-status-error">
              <input
                maxLength="20"
                className="ant-input ant-input-status-error"
                type="text"
                value=""
              />
              <span className="ant-input-suffix">
                <span className="ant-input-show-count-suffix">0 / 20</span>
              </span>
            </span>
          </div>
        </div>
        <div style="display: flex; flex-wrap: nowrap;">
          <div
            id="basic_name_help"
            className="ant-form-item-explain ant-form-item-explain-connected"
            role="alert">
            <div className="ant-form-item-explain-error" style="">
              请输入用户名称
            </div>
          </div>
          <div style="width: 0px; height: 24px;"></div>
        </div>
      </div>
    </div>
    <div
      className="ant-form-item-margin-offset"
      style="margin-bottom: -24px;"></div>
  </div>
);

const Item = (props) => {
  const { value, onChange, span = 24, children, errors, label, extra } = props;

  return (
    <div className="ant-form-item ant-form-item-with-help ant-form-item-has-error">
      <div className="ant-row ant-form-item-row">
        {/*

        <div className="ant-col ant-col-4 ant-form-item-label">
          <label
            htmlFor="basic_name"
            className="ant-form-item-required"
            title="用户名称">
            用户名称
          </label>
        </div>
      */}

        <div className={`ant-col ant-col-${span} ant-form-item-control`}>
          <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content">
              {cloneElement(children, {
                // helperText: getFieldError(name)
                //   ? getFieldError(name).join(",")
                //   : null,
                label,
                error: !!errors,
                value,
                onChange
              })}
            </div>
          </div>

          {errors ? (
            <div style={{ display: "flex", flexWrap: "nowrap" }}>
              <div
                id="basic_name_help"
                className="ant-form-item-explain ant-form-item-explain-connected"
                role="alert">
                <div className="ant-form-item-explain-error">{errors}</div>
              </div>
              <div style={{ width: "0", height: "24px" }}></div>
            </div>
          ) : null}

          {extra ? <div className="ant-form-item-extra">{extra}</div> : null}
        </div>
      </div>
      <div
        className="ant-form-item-margin-offset"
        style={{ marginBottom: "-24px" }}></div>
    </div>
  );
};

const Index = (props) => {
  const {
    name = "",
    label = "",
    form: { getFieldDecorator = () => {}, getFieldError = () => {} } = {},
    children,
    decoratorProps = {},
    initialValue,
    rules = [],
    extra
  } = props;

  console.log("extra======", extra);

  const errors = getFieldError(name) ? getFieldError(name).join(",") : null;

  return getFieldDecorator(name, {
    validateFirst: true, // 只校验一次
    initialValue,
    rules,
    ...decoratorProps
  })(
    <Item
      name={name}
      extra={extra}
      errors={errors}
      label={label}
      children={children}
    />
  );
};

export default Index;
