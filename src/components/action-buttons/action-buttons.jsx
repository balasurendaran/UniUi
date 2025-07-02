import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const ActionButton = ({ actions, ...props }) => {
  return (
    <>
      <Radio.Group size="small" {...props}>
        {actions.map((action) => (
          <Radio.Button key={action.key} value={action?.size}>
            {action.icon ? <action.icon /> : <DownloadOutlined />}
            {action.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  );
};
export default ActionButton;
