import React from "react";
import { Flex, Input } from "antd";

const UniUiOTP = ({ ...props }) => {
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };
  return (
    <Flex gap="middle" align="flex-start" vertical>
      <Input.OTP
        formatter={(str) => str.toUpperCase()}
        {...sharedProps}
        {...props}
      />
    </Flex>
  );
};
export default UniUiOTP;
