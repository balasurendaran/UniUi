import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const ActionButton = ({ actions, onAction, payload, ...props }) => {
  return (
    <Radio.Group size="small" {...props}>
      {actions?.map((action) => (
        <Radio.Button
          key={action.type || action.key}
          value={action.type}
          onClick={() => onAction && onAction(action, payload)}
        >
          {action.icon ? (
            typeof action.icon === "string" ? (
              // If icon is a string, render a default icon or handle mapping here
              <DownloadOutlined />
            ) : (
              React.createElement(action.icon)
            )
          ) : (
            <DownloadOutlined />
          )}
          {action.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default ActionButton;
