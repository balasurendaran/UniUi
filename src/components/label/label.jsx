import React from "react";
import { Controller } from "react-hook-form";

const UniUiLabel = ({ name, label, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={() => <label htmlFor={name}>{label}</label>}
    />
  );
};

export default UniUiLabel;
