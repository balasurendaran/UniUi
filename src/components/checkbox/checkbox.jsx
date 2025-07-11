import React from "react";
import { Checkbox } from "antd";

const UniUiCheckBox = ({ label, ...props }) => (
  <Checkbox {...props}>{label}</Checkbox>
);
export default UniUiCheckBox;
