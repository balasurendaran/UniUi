import React from "react";

const UniUiPreviewValues = ({ values, touchedFields, dirtyFields }) => {
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
            values: serializeValues(values),
            touchedFields,
            dirtyFields,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default UniUiPreviewValues;
