import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const UniUiDropdown = ({ label, options = [], value, onChange }) => {
  // Find the selected label
  const selected = options.find((opt) => opt.key === value);

  const menu = {
    items: options,
    onClick: ({ key }) => {
      // Simulate a synthetic event for react-hook-form Controller
      if (onChange) {
        onChange(key);
      }
    },
  };

  return (
    <Dropdown menu={menu}>
      <span>
        <Space>
          {selected ? selected.label : label || "Dropdown Menu"}
          <DownOutlined />
        </Space>
      </span>
    </Dropdown>
  );
};

export default UniUiDropdown;
