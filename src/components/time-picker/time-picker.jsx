import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};

const UniUiTimePicker = () => (
  <TimePicker
    onChange={onChange}
    defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
  />
);
export default UniUiTimePicker;
