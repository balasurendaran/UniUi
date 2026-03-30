import React from "react";
import { Controller, useForm, FormProvider } from "react-hook-form";
import UniUiButton from "components/button";
import UniUiActionButtons from "components/action-buttons";
import UniUiLabel from "components/label";
import { useRHFSectionActions } from "hooks/useRHFSectionActions";
import UniUiPreviewValues from "components/preview-values";
import { fieldMapper } from "components/form-fields/field-mapper";
import Typography from "components/typography/typography";
import UniUiUpload from "components/file-upload";

const FormFields = ({ formConfig, onSubmit: onSubmitProp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    control,
    reset,
    setValue,
    getValues,
  } = useForm({ mode: "onChange", criteriaMode: "all" });

  const { handleAction } = useRHFSectionActions({
    reset,
    setValue,
    getValues,
  });

  const onSubmit = async (data) => {
    if (onSubmitProp) {
      onSubmitProp(data);
    } else {
      console.log(data);
    }
  };

  const getError = (errors, name) => {
    return name.split(".").reduce((acc, part) => acc?.[part], errors);
  };

  // Watch all form values
  const allValues = watch();

  return (
    <div>
      <FormProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formConfig.sections.map(
            ({ key, title, actions, visible, className, fieldGroups }) => {
              return (
                visible && (
                  <div key={key} className={`${className || "card"}`}>
                    <h2>{title}</h2>
                    {actions && actions.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <UniUiActionButtons
                          actions={actions}
                          onAction={handleAction}
                        />
                      </div>
                    )}
                    {fieldGroups.map(({ key, actions, fields }, idx) => {
                      return (
                        <div key={`${key + idx}`} className="field-group-row">
                          {actions && actions.length > 0 && (
                            <div style={{ marginBottom: 16 }}>
                              <UniUiActionButtons
                                actions={actions}
                                onAction={handleAction}
                              />
                            </div>
                          )}
                          {fields.map(
                            ({
                              name,
                              label,
                              type,
                              validation,
                              size,
                              placeholder,
                              options,
                              dragger,
                              handleCustomRequest,
                              ...field
                            }) => {
                              return (
                                <div key={name} className="field-group-col">
                                  {label && (
                                    <UniUiLabel
                                      name={name}
                                      label={label}
                                      control={control}
                                    />
                                  )}
                                  {fieldMapper[type] &&
                                    (() => {
                                      const FieldComponent = fieldMapper[type];
                                      const errorObj = getError(errors, name);
                                      const isTouched = !!getError(
                                        touchedFields,
                                        name
                                      );
                                      const isDirty = !!getError(
                                        dirtyFields,
                                        name
                                      );

                                      if (type === "fileUpload") {
                                        return (
                                          <UniUiUpload
                                            key={name}
                                            name={name}
                                            control={control}
                                            fileUpload={handleCustomRequest}
                                          />
                                        );
                                      }

                                      return (
                                        <>
                                          <Controller
                                            name={name}
                                            control={control}
                                            rules={validation}
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
                                                type={type}
                                                label={label}
                                                error={fieldState.error}
                                                placeholder={placeholder}
                                                size={size || "small"}
                                                options={options} // for dropdown/radio
                                                value={controllerField.value}
                                                checked={controllerField.value} // for checkbox/radio
                                                dragger={dragger} // for file upload
                                                {...field} // spread other props
                                              />
                                            )}
                                          />

                                          {errorObj && (
                                            <>
                                              {errorObj.types
                                                ? Object.values(
                                                    errorObj.types
                                                  ).map((msg, idx) => (
                                                    <Typography
                                                      variant="caption"
                                                      error
                                                      gutterBottom
                                                      key={`${idx}-${msg}`}
                                                    >
                                                      {msg}
                                                    </Typography>
                                                  ))
                                                : errorObj.message && (
                                                    <Typography
                                                      variant="caption"
                                                      error
                                                      gutterBottom
                                                      key="single-message"
                                                    >
                                                      {errorObj.message}
                                                    </Typography>
                                                  )}
                                            </>
                                          )}
                                          {isTouched && (
                                            <div style={{ color: "blue" }}>
                                              Touched
                                            </div>
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
                              );
                            }
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              );
            }
          )}
          <UniUiButton type="submit">Submit</UniUiButton>
        </form>
      </FormProvider>
      {/* Preview Mode */}
      {formConfig?.previewValues?.visible && (
        <UniUiPreviewValues
          values={allValues}
          touchedFields={touchedFields}
          dirtyFields={dirtyFields}
        />
      )}
    </div>
  );
};

export default FormFields;
