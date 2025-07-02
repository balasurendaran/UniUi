import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputNumber } from "antd";

const UniUiInput = ({
  size = "small",
  placeholder,
  type = "text",
  ...props
}) => {
  if (type === "password") {
    return (
      <Input.Password
        size={size}
        placeholder={placeholder ? placeholder : `${size} size`}
        prefix={<UserOutlined />}
        {...props}
      />
    );
  }
  if (type === "textArea") {
    return (
      <Input.TextArea
        size={size}
        showCount
        maxLength={100}
        rows={4}
        placeholder={placeholder ? placeholder : `${size} size`}
        prefix={<UserOutlined />}
        {...props}
      />
    );
  }
  if (type === "number") {
    return <InputNumber min={1} max={10} defaultValue={3} {...props} />;
  }
  return (
    <Input
      type={type}
      size={size}
      placeholder={placeholder ? placeholder : `${size} size`}
      prefix={<UserOutlined />}
      {...props}
    />
  );
};

export default UniUiInput;
