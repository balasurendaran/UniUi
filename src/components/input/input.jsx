import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

const UniUiInput = ({ size = "small", placeholder, ...props }) => {
  return (
    <Input
      size={size}
      placeholder={placeholder ? placeholder : `${size} size`}
      prefix={<UserOutlined />}
      {...props}
    />
  );
};

export default UniUiInput;
