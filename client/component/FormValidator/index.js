import { createForm } from "rc-form";
import React, { Component } from "react";
import PropTypes from "prop-types";
class Form extends Component {
  componentWillMount() {
    // this.requiredDecorator = this.props.form.getFieldDecorator('required', {
    //   rules: [{required: true}],
    // });
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  };

  render() {
    let errors;
    const { getFieldError, getFieldDecorator } = this.props.form;
    return (
      <div>
        {getFieldDecorator("gender", {
          rules: [{ required: true, message: "Please select your gender!" }]
        })(
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.handleSelectChange}>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        )}
        {(errors = getFieldError("required")) ? errors.join(",") : null}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default createForm()(Form);
