import React from "react";
import { Radio } from "antd";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const UniUiRadio = ({ value, options, onChange, ...props }) => {
  return (
    <Radio.Group
      style={style}
      onChange={onChange}
      value={value}
      options={options}
      {...props}
    />
  );
};

export default UniUiRadio;
