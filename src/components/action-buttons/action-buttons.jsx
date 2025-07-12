import React from "react";
import { Radio } from "antd";

const ActionButton = ({ actions, onAction, payload, ...props }) => (
  <Radio.Group size="small" {...props}>
    {actions?.map(({ type, key, label, ...action }) => {
      return (
        <Radio.Button
          key={type || key}
          value={type}
          onClick={() => onAction && onAction(action, payload)}
        >
          {label}
        </Radio.Button>
      );
    })}
  </Radio.Group>
);

export default ActionButton;
