import React from "react";
import { DatePicker, Space } from "antd";
const UniUiDatePicker = ({ value, onChange, ...props }) => (
  <Space direction="vertical">
    <DatePicker value={value} onChange={onChange} {...props} />
  </Space>
);
export default UniUiDatePicker;
