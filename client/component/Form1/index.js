/*
 * @Author: your name
 * @Date: 2021-08-23 19:51:05
 * @LastEditTime: 2021-08-26 18:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Form/index.js
 */
import "./index.less";

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  Switch,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Button,
  // Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  // Select,
  Slider,
  // Switch,
  // TimePicker,
  Transfer
} from "antd";
import FormItem from "client/component/FormItem";
import { CheckDataType } from "client/utils";
import { createForm } from "rc-form";
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState
} from "react";

const { Password, TextArea } = Input;
const ItemChild = (props) => {
  let {
    type = "",
    props: formProps = {},
    component,
    render,
    onChange = () => {},
    value,
    required,
    options = [],
    label,
    name,
    error
  } = props;

  type = type ? type.toLowerCase() : type;

  const { readOnly, disabled } = formProps;

  const mapTpye = {
    textarea: (
      <TextField
        disabled={readOnly || disabled}
        className="full-width"
        multiline
        rows={4}
        {...formProps}
        // value={value}
        // onChange={onChange}
      />
    ),
    input: (
      <TextField
        disabled={readOnly || disabled}
        className="full-width"
        // required={true}
        // placeholder="请输入用户名/手机号/邮箱"
        variant="outlined"
        size="small"
        {...formProps}
        // value={value}
        // onChange={onChange}
      />
    ),
    // inputnumber: (
    //   <InputNumber
    //     {...formProps}
    //     disabled={readOnly || disabled}
    //     value={value}
    //     onChange={onChange}></InputNumber>
    // ),
    radio: (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group">
          {options.map((item) => {
            const { label, checked, value } = item;
            return (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio />}
                label={label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    ),
    rate: (
      <Rate
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Rate>
    ),
    select: (
      <FormControl fullWidth size="small">
        <InputLabel id={`${label}-simple-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-simple-select-label`}
          id={`${label}-simple-select`}
          label={label}
          {...formProps}>
          {options.map((item) => {
            const { label, value } = item;
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    ),
    switch: (
      <FormGroup>
        <FormControlLabel control={<Switch />} label={label} />
      </FormGroup>
    ),
    slider: (
      <Slider
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Slider>
    ),
    // timepicker: (
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <TimePicker
    //       label={label}
    //       // value={value}
    //       // onChange={(newValue) => {
    //       //   setValue(newValue);
    //       // }}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </LocalizationProvider>
    // ),
    transfer: (
      <Transfer
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Transfer>
    ),
    checkbox: (
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {options.map((item) => {
            const { label, checked, value } = item;

            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => {}}
                    name={value}
                  />
                }
                label={label}
                key={value}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    )
  };

  return render
    ? render({
        ...props,
        render: undefined
      })
    : component
    ? component
    : type in mapTpye
    ? mapTpye[type]
    : null;
};

const $ItemChild = (props) => {
  let {
    type = "",
    props: formProps = {},
    component,
    render,
    onChange = () => {},
    value = "",
    required
  } = props;
  type = type ? type.toLowerCase() : type;

  const { readOnly, disabled } = formProps;

  const mapTpye = {
    textarea: (
      <TextArea
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}
        rows={4}
      />
    ),
    input: (
      <TextField
        disabled={readOnly || disabled}
        className="full-width"
        required={required}
        // placeholder="请输入用户名/手机号/邮箱"
        variant="outlined"
        size="small"
        {...formProps}
      />
    ),
    inputnumber: (
      <InputNumber
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></InputNumber>
    ),
    radio: (
      <Radio
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Radio>
    ),
    rate: (
      <Rate
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Rate>
    ),
    select: (
      <Select
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Select>
    ),
    switch: (
      <Switch
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Switch>
    ),
    slider: (
      <Slider
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Slider>
    ),
    timepicker: (
      <TimePicker
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></TimePicker>
    ),
    transfer: (
      <Transfer
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Transfer>
    ),
    checkbox: (
      <Checkbox
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Checkbox>
    ),
    password: (
      <Password
        {...formProps}
        disabled={readOnly || disabled}
        value={value}
        onChange={onChange}></Password>
    )
  };

  return type in mapTpye ? mapTpye[type] : null;
};

const BaseForm = (props) => {
  const {
    fields = [],
    formProps = {},
    onReady = () => {},
    children = [],
    onConfirm = () => {},
    // onReset = () => {},
    initialValues = {}
  } = props;

  const [form] = Form.useForm();
  const [formInitialValues, setFormInitialValues] = useState({});

  const transformInitialValues = useCallback(async (initialValues) => {
    if (CheckDataType.isFunction(initialValues)) {
      return initialValues(form);
    }
    if (CheckDataType.isPromise(initialValues)) {
      return await initialValues(form);
    }

    return initialValues;
  }, []);
  const getInitialValues = useCallback(async () => {
    const vavlues = await transformInitialValues(initialValues);
    setFormInitialValues(vavlues);
  }, []);

  useEffect(() => {
    getInitialValues();
  }, []);

  // initialValues
  const onFinish = (values) => {
    console.log("Success:", values);
    onConfirm(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    onReady(form);
  }, [form]);

  return (
    <div className="base-form">
      <Form
        key={JSON.stringify(formInitialValues)}
        form={form}
        name="basic"
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 8
        }}
        initialValues={formInitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formProps}>
        {fields.map((item, index) => {
          const {
            type,
            title,
            items = [],
            render,
            itemProps = {},
            label,
            name,
            props = {},
            options = [],
            rules
          } = item;

          return type !== "section" ? (
            <Form.Item
              rules={rules}
              label={label}
              name={name}
              {...itemProps}
              key={index}>
              <ItemChild
                type={type}
                props={props}
                options={options}
                render={render}></ItemChild>
            </Form.Item>
          ) : (
            <div className="section" key={index}>
              <div className="title">{title}</div>
              {items.map(($item, index) => {
                const {
                  render,
                  itemProps = {},
                  label,
                  name,
                  options = [],
                  props = {},
                  type,
                  rules
                } = $item;

                return (
                  <Form.Item
                    label={label}
                    name={name}
                    rules={rules}
                    {...itemProps}
                    key={index}>
                    <ItemChild
                      type={type}
                      props={props}
                      options={options}
                      render={render}></ItemChild>
                  </Form.Item>
                );
              })}
            </div>
          );
        })}

        {/* 子节点 */}
        {Children.map(
          CheckDataType.isFunction(children) ? children() : children,
          (child) => {
            return cloneElement(child, props);
          }
        )}
      </Form>
    </div>
  );
};

const SearchForm = createForm()((props) => {
  const {
    fields = [],
    formProps = {},
    onReady = () => {},
    children = [],
    shrinkLength,
    onConfirm = () => {},
    onReset = () => {},
    initialValues = {},
    form
  } = props;

  console.log("props=======", props);
  debugger;

  // const [form] = Form.useForm();

  const [formInitialValues, setFormInitialValues] = useState({});

  const transformInitialValues = useCallback(async (initialValues) => {
    if (CheckDataType.isFunction(initialValues)) {
      return initialValues(form);
    }
    if (CheckDataType.isPromise(initialValues)) {
      return await initialValues(form);
    }

    return initialValues;
  }, []);
  const getInitialValues = useCallback(async () => {
    const values = await transformInitialValues(initialValues);
    setFormInitialValues(values);
  }, []);

  useEffect(() => {
    getInitialValues();
  }, []);

  const [expand, setExpand] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    onConfirm(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFill = () => {
    const values = form.getFieldsValue();
    const restValues = Object.keys(values).reduce((acc, item) => {
      return {
        ...acc,
        [item]: undefined
      };
    }, {});

    form.setFieldsValue(restValues);
    onReset(restValues);
  };

  useEffect(() => {
    onReady(form);
  }, []);

  const renderFields = useCallback(() => {
    let length = shrinkLength
      ? expand
        ? fields.length
        : shrinkLength > fields.length
        ? fields.length
        : shrinkLength
      : fields.length;
    let fieldsVonde = [];
    for (let index = 0; index < length; index++) {
      const item = fields[index];

      const {
        span = 1,
        label,
        name,
        itemProps = {},
        type,
        props,
        rules = [],
        options = []
      } = item;
      console.log("item=====", item);

      fieldsVonde.push(
        <div key={index} className={`span span-${span}`}>
          <FormItem rules={rules} form={form} label={label} name={name}>
            {ItemChild({
              type,
              props,
              options,
              label,
              name
            })}
            {/* <ItemChild type={type} props={props}></ItemChild> */}
            {/*
            <TextField
              className="full-width"
              required
              placeholder="请输入用户名/手机号/邮箱"
              variant="outlined"
              size="small"
            /> */}
          </FormItem>
        </div>
      );
    }
    return fieldsVonde;
  }, [expand, fields, form]);

  return (
    <div className="search-base-form-box">
      {renderFields(props)}

      <div className={`buttons`}>
        {shrinkLength >= fields.length ? null : (
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}>
            {expand ? (
              <>
                <UpOutlined />
                收起
              </>
            ) : (
              <>
                <DownOutlined /> 展开
              </>
            )}
          </a>
        )}
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button htmlType="button" onClick={onFill}>
          重置
        </Button>
      </div>

      {/* 子节点 */}
      {Children.map(
        CheckDataType.isFunction(children) ? children() : children,
        (child) => {
          return cloneElement(child, props);
        }
      )}
    </div>
  );
});
// BaseForm.SearchForm=SearchForm
export default BaseForm;
export { SearchForm };
