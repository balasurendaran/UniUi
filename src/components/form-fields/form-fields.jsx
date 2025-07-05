import React from "react";
import { Controller, useForm } from "react-hook-form";
import UniUiButton from "components/button";
import UniUiInput from "components/input";
import UniUiFileUpload from "components/file-upload";
import UniUiSwitch from "components/switch";
import UniUiRadio from "components/radio";
import UniUiDropdown from "components/dropdown";
import UniUiDatePicker from "components/date-picker";
import UniUiTimePicker from "components/time-picker";
import UniUiPhoneInput from "components/phone-input";
import UniUiOTP from "components/otp";
import UniUiCardWithOptions from "components/card-with-options";
import UniUiCheckBox from "components/checkbox";
import UniUiActionButtons from "components/action-buttons";
import UniUiLabel from "components/label";
import { useRHFSectionActions } from "hooks/useRHFSectionActions";

const FormFields = ({ formConfig }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    control,
    reset,
    setValue,
    getValues,
  } = useForm({ mode: "onChange", criteriaMode: "all" }); // or "onBlur" for blur validation

  const { handleAction } = useRHFSectionActions({
    reset,
    setValue,
    getValues,
  });

  const fieldMapper = {
    label: UniUiLabel,
    button: UniUiButton,
    text: UniUiInput,
    textArea: UniUiInput,
    email: UniUiInput,
    password: UniUiInput,
    number: UniUiInput,
    switch: UniUiSwitch,
    checkbox: UniUiCheckBox,
    radio: UniUiRadio,
    dropdown: UniUiDropdown,
    datePicker: UniUiDatePicker,
    timePicker: UniUiTimePicker,
    phoneInput: UniUiPhoneInput,
    otP: UniUiOTP,
    cardWithOptions: UniUiCardWithOptions,
    fileUpload: UniUiFileUpload,
    actions: UniUiActionButtons,
    // Add more field types as needed
  };

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
  };

  const getError = (errors, name) => {
    return name.split(".").reduce((acc, part) => acc?.[part], errors);
  };

  // Watch all form values
  const allValues = watch();

  /**
   * Serialize a nested object of form values, converting any
   * AntD DatePicker/TimePicker values (Moment/Dayjs) to strings
   * in the format "YYYY-MM-DD HH:mm:ss".
   * @param {object} values - The object to serialize.
   * @returns {object} The serialized object.
   */
  function serializeValues(values) {
    if (!values || typeof values !== "object") return values;
    const result = Array.isArray(values) ? [] : {};
    for (const key in values) {
      const val = values[key];
      if (val && typeof val === "object" && typeof val.format === "function") {
        // AntD DatePicker/TimePicker value (Moment/Dayjs)
        result[key] = val.format("YYYY-MM-DD HH:mm:ss");
      } else if (val && typeof val === "object") {
        result[key] = serializeValues(val);
      } else {
        result[key] = val;
      }
    }
    return result;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formConfig.sections.map((section) => {
          return (
            <div key={section.key} className="card">
              <h2>{section.title}</h2>
              {section.actions && section.actions.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <UniUiActionButtons
                    actions={section.actions}
                    onAction={handleAction}
                  />
                </div>
              )}
              {section.fieldGroups.map((fieldGroup, idx) => {
                return (
                  <div
                    key={`${fieldGroup.key + idx}`}
                    className="field-group-row"
                    style={{
                      background: "#f3f3f3",
                      padding: 16,
                      marginBottom: 30,
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 10px 0px",
                      gap: 16,
                    }}
                  >
                    {fieldGroup.actions && fieldGroup.actions.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <UniUiActionButtons
                          actions={fieldGroup.actions}
                          onAction={handleAction}
                        />
                      </div>
                    )}
                    {fieldGroup.fields.map((field) => (
                      <div key={field.name} className="field-group-col">
                        {field.label && (
                          <UniUiLabel
                            name={field.name}
                            label={field.label}
                            control={control}
                          />
                        )}
                        {fieldMapper[field.type] &&
                          (() => {
                            const FieldComponent = fieldMapper[field.type];
                            const errorObj = getError(errors, field.name);
                            const isTouched = !!getError(
                              touchedFields,
                              field.name
                            );
                            const isDirty = !!getError(dirtyFields, field.name);

                            return (
                              <>
                                <Controller
                                  name={field.name}
                                  control={control}
                                  rules={field.validation}
                                  render={({
                                    field: controllerField,
                                    fieldState,
                                  }) => (
                                    <FieldComponent
                                      {...register(
                                        field.name,
                                        field.validation
                                      )}
                                      {...controllerField}
                                      type={field.type}
                                      label={field.label}
                                      error={fieldState.error}
                                      placeholder={field.placeholder}
                                      size={field.size || "small"}
                                      options={field.options}
                                      value={controllerField.value}
                                      dragger={field.dragger}
                                    />
                                  )}
                                />

                                {errorObj && errorObj.types
                                  ? Object.values(errorObj.types).map(
                                      (msg, idx) => (
                                        <div
                                          key={`${idx} + ${errorObj.type}`}
                                          className="field-error"
                                          style={{
                                            color: "red",
                                            fontSize: 12,
                                            marginTop: 4,
                                          }}
                                        >
                                          {msg}
                                        </div>
                                      )
                                    )
                                  : errorObj &&
                                    errorObj.message && (
                                      <div
                                        key={errorObj.type}
                                        className="field-error"
                                        style={{
                                          color: "red",
                                          fontSize: 12,
                                          marginTop: 4,
                                        }}
                                      >
                                        {errorObj.message}
                                      </div>
                                    )}
                                {isTouched && (
                                  <div style={{ color: "blue" }}>Touched</div>
                                )}
                                {isDirty && (
                                  <div style={{ color: "orange" }}>
                                    Dirty (Value changed)
                                  </div>
                                )}
                              </>
                            );
                          })()}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
        <UniUiButton type="submit">Submit</UniUiButton>
      </form>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <UniUiButton className="uni-ui-button" />
        <UniUiFileUpload fileList={fileList} />
        <UniUiSwitch />
        <UniUiRadio />
        <UniUiInput />
        <UniUiDropdown />
        <UniUiDatePicker />
        <UniUiTimePicker />
        <UniUiPhoneInput />
        <UniUiOTP />
        <UniUiCardWithOptions />
      </form> */}

      {/* Preview Mode */}
      <div style={{ marginTop: 32 }}>
        <h3>Preview Values</h3>
        <pre
          style={{
            background: "#f6f8fa",
            padding: 16,
            borderRadius: 8,
            fontSize: 14,
            overflowX: "auto",
            fontFamily:
              "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {JSON.stringify(
            {
              values: serializeValues(allValues),
              touchedFields,
              dirtyFields,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default FormFields;
