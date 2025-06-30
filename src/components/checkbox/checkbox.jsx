import React from "react";
import { Checkbox } from "antd";
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const UniUiCheckBox = ({ label, ...props }) => (
  <Checkbox onChange={onChange} {...props}>
    {label}
  </Checkbox>
);
export default UniUiCheckBox;
