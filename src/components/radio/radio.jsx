import React, { useState } from "react";
import { Input, Radio } from "antd";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const UniUiRadio = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Radio.Group
      style={style}
      onChange={onChange}
      value={value}
      options={[
        { value: 1, label: "Option A" },
        { value: 2, label: "Option B" },
        { value: 3, label: "Option C" },
        {
          value: 4,
          label: (
            <>
              More...
              {value === 4 && (
                <Input
                  variant="filled"
                  placeholder="please input"
                  style={{ width: 120, marginInlineStart: 12 }}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
};

export default UniUiRadio;
