import React from "react";
import { getFieldType } from "./field-types";

/** Fields that support an options list (label/value pairs) */
const OPTIONS_TYPES = ["dropdown", "radio", "checkbox"];

/**
 * Right panel — configure the selected field's properties.
 * All changes call `onChange(updatedField)` immediately.
 */
const FieldConfigPanel = ({ field, onChange }) => {
  if (!field) {
    return (
      <aside className="fb-config">
        <div className="fb-config__header">
          <p className="fb-config__title">Properties</p>
          <p className="fb-config__field-type" style={{ color: "#4a5080", fontSize: 13 }}>
            No field selected
          </p>
        </div>
        <div className="fb-config__scroll">
          <div className="fb-config-empty">
            <div className="fb-config-empty__icon">🎛️</div>
            <p className="fb-config-empty__text">
              Select a field on the canvas to configure its properties
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const typeDef = getFieldType(field.type) || {};

  const update = (key, value) => onChange({ ...field, [key]: value });

  const updateValidation = (key, value) =>
    onChange({
      ...field,
      validation: {
        ...(field.validation || {}),
        [key]: value || undefined,
      },
    });

  /* ── Options helpers ── */
  const addOption = () => {
    const opts = field.options || [];
    const idx = opts.length + 1;
    const newOpt =
      field.type === "dropdown"
        ? { key: `option_${idx}`, label: `Option ${idx}` }
        : { value: `option_${idx}`, label: `Option ${idx}` };
    update("options", [...opts, newOpt]);
  };

  const updateOption = (i, key, val) => {
    const opts = [...(field.options || [])];
    opts[i] = { ...opts[i], [key]: val };
    update("options", opts);
  };

  const removeOption = (i) => {
    const opts = [...(field.options || [])];
    opts.splice(i, 1);
    update("options", opts);
  };

  const hasOptions = OPTIONS_TYPES.includes(field.type);
  const validation = field.validation || {};

  return (
    <aside className="fb-config">
      {/* Header */}
      <div className="fb-config__header">
        <p className="fb-config__title">Properties</p>
        <p className="fb-config__field-type">
          <span style={{ background: typeDef.bg, padding: "2px 6px", borderRadius: 6 }}>
            {typeDef.icon}
          </span>{" "}
          {typeDef.label || field.type}
        </p>
      </div>

      <div className="fb-config__scroll">

        {/* ── Basic ── */}
        <div className="fb-form-group">
          <label className="fb-label">Label</label>
          <input
            className="fb-input"
            value={field.label || ""}
            onChange={(e) => update("label", e.target.value)}
            placeholder="Field label"
          />
        </div>

        <div className="fb-form-group">
          <label className="fb-label">Field Name <span style={{ color: "#a78bfa" }}>(key)</span></label>
          <input
            className="fb-input"
            value={field.name || ""}
            onChange={(e) =>
              update("name", e.target.value.replace(/\s+/g, "_").toLowerCase())
            }
            placeholder="field_name"
          />
        </div>

        {/* Placeholder (not for switch / checkbox / radio) */}
        {!["switch", "checkbox", "radio", "datePicker", "timePicker", "otP", "fileUpload"].includes(field.type) && (
          <div className="fb-form-group">
            <label className="fb-label">Placeholder</label>
            <input
              className="fb-input"
              value={field.placeholder || ""}
              onChange={(e) => update("placeholder", e.target.value)}
              placeholder="Hint text"
            />
          </div>
        )}

        {/* Default value */}
        {["text", "textArea", "email", "number"].includes(field.type) && (
          <div className="fb-form-group">
            <label className="fb-label">Default Value</label>
            <input
              className="fb-input"
              value={field.defaultValue || ""}
              onChange={(e) => update("defaultValue", e.target.value)}
              placeholder="Pre-filled value"
            />
          </div>
        )}

        {/* Rows for textarea */}
        {field.type === "textArea" && (
          <div className="fb-form-group">
            <label className="fb-label">Rows</label>
            <input
              className="fb-input"
              type="number"
              min={2}
              max={20}
              value={field.rows || 4}
              onChange={(e) => update("rows", Number(e.target.value))}
            />
          </div>
        )}

        {/* Span (column width) */}
        <div className="fb-form-group">
          <label className="fb-label">Column Span <span style={{ color: "#4a5080" }}>(1–24)</span></label>
          <select
            className="fb-select"
            value={field.span || 24}
            onChange={(e) => update("span", Number(e.target.value))}
          >
            {[6, 8, 12, 16, 18, 24].map((v) => (
              <option key={v} value={v}>
                {v} {v === 24 ? "(full)" : v === 12 ? "(half)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="fb-divider" />

        {/* ── Validation ── */}
        <div className="fb-form-group">
          <label className="fb-checkbox-row">
            <input
              type="checkbox"
              checked={!!validation.required}
              onChange={(e) =>
                updateValidation(
                  "required",
                  e.target.checked ? `${field.label || field.name} is required` : undefined
                )
              }
            />
            <span>Required</span>
          </label>
        </div>

        {!["switch", "checkbox", "radio", "datePicker", "timePicker", "otP", "fileUpload", "dropdown", "phoneInput"].includes(field.type) && (
          <>
            <div className="fb-form-group">
              <label className="fb-label">Min Length</label>
              <input
                className="fb-input"
                type="number"
                min={0}
                value={validation.minLength?.value || ""}
                onChange={(e) =>
                  updateValidation(
                    "minLength",
                    e.target.value
                      ? { value: Number(e.target.value), message: `Min ${e.target.value} characters` }
                      : undefined
                  )
                }
                placeholder="e.g. 3"
              />
            </div>

            <div className="fb-form-group">
              <label className="fb-label">Max Length</label>
              <input
                className="fb-input"
                type="number"
                min={0}
                value={validation.maxLength?.value || ""}
                onChange={(e) =>
                  updateValidation(
                    "maxLength",
                    e.target.value
                      ? { value: Number(e.target.value), message: `Max ${e.target.value} characters` }
                      : undefined
                  )
                }
                placeholder="e.g. 100"
              />
            </div>
          </>
        )}

        {/* Options editor */}
        {hasOptions && (
          <>
            <div className="fb-divider" />
            <label className="fb-label">Options</label>
            <div className="fb-options-list">
              {(field.options || []).map((opt, i) => {
                const labelKey = "label";
                const valueKey = field.type === "dropdown" ? "key" : "value";
                return (
                  <div className="fb-option-row" key={i}>
                    <input
                      className="fb-input"
                      value={opt[valueKey] || ""}
                      onChange={(e) => updateOption(i, valueKey, e.target.value)}
                      placeholder="value"
                      style={{ flex: "0 0 90px" }}
                    />
                    <input
                      className="fb-input"
                      value={opt[labelKey] || ""}
                      onChange={(e) => updateOption(i, labelKey, e.target.value)}
                      placeholder="label"
                    />
                    <button
                      className="fb-icon-btn fb-icon-btn--danger"
                      onClick={() => removeOption(i)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
            <button className="fb-add-option-btn" onClick={addOption}>
              ＋ Add Option
            </button>
          </>
        )}

        {/* Read-only toggle */}
        <div className="fb-divider" />
        <div className="fb-form-group">
          <label className="fb-checkbox-row">
            <input
              type="checkbox"
              checked={!!field.readOnly}
              onChange={(e) => update("readOnly", e.target.checked)}
            />
            <span>Read Only</span>
          </label>
        </div>

        <div className="fb-form-group">
          <label className="fb-label">Class Name</label>
          <input
            className="fb-input"
            value={field.className || ""}
            onChange={(e) => update("className", e.target.value)}
            placeholder="custom-class"
          />
        </div>
      </div>
    </aside>
  );
};

export default FieldConfigPanel;
