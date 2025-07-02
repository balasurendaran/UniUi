import React from "react";
import PhoneInput from "antd-phone-input";
import FormItem from "antd/es/form/FormItem";
import { ConfigProvider } from "antd";
import en_GB from "antd/locale/en_GB";

const validator = (_, { valid }) => {
  // if (valid(true)) return Promise.resolve(); // strict validation
  if (valid()) return Promise.resolve(); // non-strict validation
  return Promise.reject("Invalid phone number");
};

const UniUiPhoneInput = ({ ...props }) => {
  return (
    <FormItem name="phone" rules={[{ validator }]}>
      <ConfigProvider locale={en_GB}>
        <PhoneInput enableSearch {...props} />
      </ConfigProvider>
    </FormItem>
  );
};

export default UniUiPhoneInput;
