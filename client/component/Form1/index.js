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
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import {
//   // Button,
//   // Checkbox,
//   Form
//   // Input,
//   // InputNumber,
//   // Radio,
//   // Rate,
//   // Select,
//   // Slider,
//   // Switch,
//   // TimePicker,
//   // Transfer
// } from "antd";
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

// const { Password, TextArea } = Input;
const FromRadio = (props) => {
  const { error, label, options = [], value, onChange, required } = props;

  return (
    <FormControl
      onChange={({ target }) => {
        onChange(target.value);
      }}
      error={error}>
      <FormLabel error={error}>{required ? label + " *" : label}</FormLabel>
      <RadioGroup error={error} row>
        {options.map((item) => {
          const { label, checked, value: $value } = item;
          return (
            <FormControlLabel
              key={$value}
              value={$value}
              control={<Radio checked={$value === value} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const FromSelect = (props) => {
  const {
    error,
    label,
    options = [],
    value = [],
    onChange,
    formProps = {},
    required
  } = props;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel error={error} id={`${label}-simple-select-label`}>
        {required ? label + " *" : label}
      </InputLabel>
      <Select
        onChange={({ target }) => {
          onChange(target.value);
        }}
        error={error}
        labelId={`${label}-simple-select-label`}
        id={`${label}-simple-select`}
        label={required ? label + " *" : label}
        value={value}
        {...formProps}>
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <MenuItem key={$value} value={$value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const FromMultipleSelect = (props) => {
  const {
    error,
    label,
    options = [],
    value = [],
    onChange,
    formProps = {},
    required
  } = props;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel error={error}>{required ? label + " *" : label}</InputLabel>
      <Select
        onChange={({ target }) => {
          onChange(target.value);
        }}
        error={error}
        label={required ? label + " *" : label}
        value={value}
        {...formProps}
        multiple
        // input={<OutlinedInput label="Tag" />}
        // renderValue={(selected) => selected.join(", ")}

        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}>
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <MenuItem key={$value} value={$value}>
              {/*label*/}
              <Checkbox checked={value.indexOf($value) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const FromSwitch = (props) => {
  const {
    error,
    label,
    options = [],
    value,
    onChange,
    formProps = {},
    required
  } = props;

  return (
    <FormControl
      error={error}
      onChange={({ target }) => {
        // console.log("target=====", target);
      }}>
      <FormLabel onChange={({ target }) => {}}>
        {required ? label + " *" : label}
      </FormLabel>
      <FormGroup onChange={(v) => {}}>
        {options.map((item, index) => {
          const { label, value: $value } = item;
          return (
            <FormControlLabel
              key={index}
              value={$value}
              label={label}
              onChange={({ target }) => {
                onChange(target.checked);
              }}
              control={<Switch checked={value} />}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

const FromCheckbox = (props) => {
  const {
    error,
    label,
    options = [],
    value = [],
    onChange,
    formProps = {},
    required
  } = props;

  [].includes;
  return (
    <FormControl
      onChange={({ target }) => {
        const { value: $value, checked } = target;
        if (checked) {
          value.push($value);
        } else {
          let index = value.findIndex((item) => {
            return item === $value;
          });
          if (index >= 0) {
            value.splice(index, 1);
          }
        }
        onChange([...value]);
      }}
      error={error}>
      <FormLabel>{required ? label + " *" : label}</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label">
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <FormControlLabel
              key={$value}
              value={$value}
              label={label}
              control={
                <Checkbox
                  checked={value.includes($value)}
                  onChange={() => {}}
                  name={$value}
                />
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const FromTextField = (props) => {
  const { error, label, value = "", onChange, formProps = {} } = props;
  const { readOnly, disabled, required, multiple } = formProps;
  return (
    <TextField
      error={error}
      disabled={readOnly || disabled}
      className="full-width"
      variant="outlined"
      size="small"
      label={label}
      {...formProps}
      value={value}
      onChange={({ target }) => {
        onChange(target.value);
      }}
    />
  );
};

const ItemChild = (props) => {
  let { type = "", props: formProps = {}, component, render } = props;

  type = type ? type.toLowerCase() : type;

  const { multiple } = formProps;

  const mapTpye = {
    textarea: (
      <FromTextField
        {...props}
        formProps={{
          multiline: true,
          rows: 4,
          ...formProps
        }}
      />
    ),
    input: <FromTextField {...props} />,
    radio: <FromRadio {...props} />,
    // rate: (
    //   <Rate
    //     {...formProps}
    //     disabled={readOnly || disabled}
    //     value={value}
    //     onChange={onChange}></Rate>
    // ),
    select: multiple ? (
      <FromMultipleSelect
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}

        {...props}
      />
    ) : (
      <FromSelect
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
    ),

    switch: (
      <FromSwitch
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
    ),
    slider: (
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        {...formProps}
        // {...props}
      />
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
    // transfer: (
    //   <Transfer
    //     {...formProps}
    //     disabled={readOnly || disabled}
    //     value={value}
    //     onChange={onChange}></Transfer>
    // ),
    checkbox: (
      <FromCheckbox
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
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

// const BaseForm = (props) => {
//   const {
//     fields = [],
//     formProps = {},
//     onReady = () => {},
//     children = [],
//     onConfirm = () => {},
//     // onReset = () => {},
//     initialValues = {}
//   } = props;

//   const [form] = Form.useForm();
//   const [formInitialValues, setFormInitialValues] = useState({});

//   const transformInitialValues = useCallback(async (initialValues) => {
//     if (CheckDataType.isFunction(initialValues)) {
//       return initialValues(form);
//     }
//     if (CheckDataType.isPromise(initialValues)) {
//       return await initialValues(form);
//     }

//     return initialValues;
//   }, []);
//   const getInitialValues = useCallback(async () => {
//     const vavlues = await transformInitialValues(initialValues);
//     setFormInitialValues(vavlues);
//   }, []);

//   useEffect(() => {
//     getInitialValues();
//   }, []);

//   // initialValues
//   const onFinish = (values) => {
//     console.log("Success:", values);
//     onConfirm(values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   useEffect(() => {
//     onReady(form);
//   }, [form]);

//   return (
//     <div className="base-form">
//       <Form
//         key={JSON.stringify(formInitialValues)}
//         form={form}
//         name="basic"
//         labelCol={{
//           span: 4
//         }}
//         wrapperCol={{
//           span: 8
//         }}
//         initialValues={formInitialValues}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         {...formProps}>
//         {fields.map((item, index) => {
//           const {
//             type,
//             title,
//             items = [],
//             render,
//             itemProps = {},
//             label,
//             name,
//             props = {},
//             options = [],
//             rules
//           } = item;

//           return type !== "section" ? (
//             <Form.Item
//               rules={rules}
//               label={label}
//               name={name}
//               {...itemProps}
//               key={index}>
//               <ItemChild
//                 type={type}
//                 props={props}
//                 options={options}
//                 render={render}></ItemChild>
//             </Form.Item>
//           ) : (
//             <div className="section" key={index}>
//               <div className="title">{title}</div>
//               {items.map(($item, index) => {
//                 const {
//                   render,
//                   itemProps = {},
//                   label,
//                   name,
//                   options = [],
//                   props = {},
//                   type,
//                   rules
//                 } = $item;

//                 return (
//                   <Form.Item
//                     label={label}
//                     name={name}
//                     rules={rules}
//                     {...itemProps}
//                     key={index}>
//                     <ItemChild
//                       type={type}
//                       props={props}
//                       options={options}
//                       render={render}></ItemChild>
//                   </Form.Item>
//                 );
//               })}
//             </div>
//           );
//         })}

//         {/* 子节点 */}
//         {Children.map(
//           CheckDataType.isFunction(children) ? children() : children,
//           (child) => {
//             return cloneElement(child, props);
//           }
//         )}
//       </Form>
//     </div>
//   );
// };

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

  const { validateFields } = form;

  const onSubmit = async () => {
    validateFields((error, values) => {
      if (!error) {
        onFinish(values);
      } else {
        console.error(error);
      }
    });
  };

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
    form.resetFields();
    const values = form.getFieldsValue();

    const restValues = Object.keys(values).reduce((acc, item) => {
      return {
        ...acc,
        [item]: undefined
      };
    }, {});

    // form.setFieldsValue(restValues);
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
        options = [],
        extra
      } = item;

      fieldsVonde.push(
        <div key={index} className={`span span-${span}`}>
          <FormItem
            extra={extra}
            rules={rules}
            form={form}
            label={label}
            name={name}>
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
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}>
          搜索
        </Button>
        <Button variant="outlined" onClick={onFill}>
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
// export default BaseForm;
export { SearchForm };
