import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

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
