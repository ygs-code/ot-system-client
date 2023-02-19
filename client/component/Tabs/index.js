import { Tabs } from "antd";
import React from "react";

export default (props) => {
  const { items = [], onChange } = props;
  return (
    <Tabs
      {...props}
      onChange={onChange}
      //   defaultActiveKey="1"
      items={items.map((item) => {
        const { label, value, key, tab } = item;
        return {
          label: label || tab,
          key: value || key
        };
      })}></Tabs>
  );
};
