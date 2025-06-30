import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const UniUiTimePicker = ({ value, onChange, ...props }) => (
  <TimePicker
    value={value ? dayjs(value, "HH:mm:ss") : null}
    format="HH:mm:ss"
    onChange={(time) => {
      onChange && onChange(time ? time.format("HH:mm:ss") : null);
    }}
    {...props}
    defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
  />
);

export default UniUiTimePicker;
