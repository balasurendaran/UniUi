import React, { useState } from "react";
import { getFieldType } from "./field-types";

/* ──────────────────────────────────────────
   Simulated field renderers (live preview)
──────────────────────────────────────────── */
const SimInput = ({ placeholder, type }) => (
  <div className="fb-sim-input">
    {type === "password" ? "••••••••" : placeholder || "Type here…"}
  </div>
);
const SimTextarea = ({ placeholder, rows }) => (
  <div className="fb-sim-input fb-sim-textarea" style={{ height: (rows || 4) * 20 }}>
    {placeholder || "Type here…"}
  </div>
);
const SimSelect = ({ options }) => (
  <div className="fb-sim-input fb-sim-select">
    <span>{options?.[0]?.label || "Select an option"}</span>
    <span style={{ fontSize: 10, opacity: 0.6 }}>▼</span>
  </div>
);
const SimRadio = ({ options }) => (
  <div className="fb-sim-radio">
    {(options || [{ label: "Option 1" }, { label: "Option 2" }]).map((o, i) => (
      <div key={i} className="fb-sim-radio-item">
        <div className="fb-sim-radio-dot" style={i === 0 ? { borderColor: "#7c3aed", background: "#ede9fe" } : {}} />
        {o.label}
      </div>
    ))}
  </div>
);
const SimCheckbox = ({ options, label }) => {
  const items = options?.length ? options : [{ label: label || "I agree" }];
  return (
    <div className="fb-sim-radio">
      {items.map((o, i) => (
        <div key={i} className="fb-sim-checkbox-item">
          <div className="fb-sim-checkbox-box" />
          {o.label}
        </div>
      ))}
    </div>
  );
};
const SimSwitch = ({ label }) => (
  <div className="fb-sim-switch-wrap">
    <div className="fb-sim-switch"><div className="fb-sim-switch-thumb" /></div>
    <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
  </div>
);
const SimOTP = () => (
  <div className="fb-sim-otp">
    {[0,1,2,3,4,5].map((i) => <div key={i} className="fb-sim-otp-cell" />)}
  </div>
);
const SimPhone = ({ placeholder }) => (
  <div className="fb-sim-input fb-sim-select">
    <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, color: "#374151" }}>🇮🇳 +91</span>
      <span>{placeholder || "Enter phone number"}</span>
    </span>
  </div>
);
const SimDate = ({ placeholder }) => (
  <div className="fb-sim-input fb-sim-select">
    <span>{placeholder || "dd/mm/yyyy"}</span>
    <span style={{ fontSize: 14, opacity: 0.5 }}>📅</span>
  </div>
);
const SimFile = () => (
  <div style={{ border: "1.5px dashed #d1d5db", borderRadius: 8, padding: "14px 16px", textAlign: "center", color: "#9ca3af", fontSize: 13, background: "#f9fafb" }}>
    📎 Click or drag a file to upload
  </div>
);
const SimField = ({ field }) => {
  switch (field.type) {
    case "text": case "email": case "number": return <SimInput placeholder={field.placeholder} />;
    case "password": return <SimInput placeholder={field.placeholder} type="password" />;
    case "textArea": return <SimTextarea placeholder={field.placeholder} rows={field.rows} />;
    case "dropdown": return <SimSelect options={field.options} />;
    case "radio": return <SimRadio options={field.options} />;
    case "checkbox": return <SimCheckbox options={field.options} label={field.label} />;
    case "switch": return <SimSwitch label={field.label} />;
    case "otP": return <SimOTP />;
    case "phoneInput": return <SimPhone placeholder={field.placeholder} />;
    case "datePicker": return <SimDate placeholder={field.placeholder} />;
    case "timePicker": return <div className="fb-sim-input fb-sim-select"><span>{field.placeholder || "hh:mm"}</span><span style={{ fontSize: 14, opacity: 0.5 }}>🕐</span></div>;
    case "fileUpload": return <SimFile />;
    default: return <SimInput placeholder={field.placeholder} />;
  }
};

/* ──────────────────────────────────────────
   FieldCard — single field with drag support
──────────────────────────────────────────── */
const FieldCard = ({
  field, rowId, isSelected, isFirstInRow, isLastInRow,
  onSelect, onDelete, onDuplicate, onMoveLeft, onMoveRight,
  onDragStart, onDropOnField,
}) => {
  const typeDef = getFieldType(field.type);
  const showLabel = !["switch"].includes(field.type);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={[
        "fb-preview-field",
        isSelected ? "fb-preview-field--selected" : "",
        dragOver    ? "fb-preview-field--dragover" : "",
      ].join(" ")}
      style={{ flex: field.span || 24, minWidth: 0, margin: 0 }}
      onClick={() => onSelect()}

      /* Drag source */
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        onDragStart(rowId, field._id);
      }}
      onDragEnd={() => setDragOver(false)}

      /* Drop target — insert before this field */
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(false); onDropOnField(rowId, field._id); }}
    >
      {/* Type chip */}
      {isSelected && (
        <div className="fb-field-chip" style={{ background: typeDef?.color || "#7c3aed" }}>
          {typeDef?.icon} {typeDef?.label || field.type}
        </div>
      )}

      {/* Drag handle */}
      <div className="fb-drag-handle" title="Drag to reorder">⠿</div>

      {/* Actions overlay */}
      <div className="fb-preview-field__overlay" onClick={(e) => e.stopPropagation()}>
        <button className="fb-icon-btn" title="Move Left"  onClick={onMoveLeft}  disabled={isFirstInRow}>←</button>
        <button className="fb-icon-btn" title="Move Right" onClick={onMoveRight} disabled={isLastInRow}>→</button>
        <button className="fb-icon-btn" title="Duplicate"  onClick={onDuplicate}>⧉</button>
        <button className="fb-icon-btn fb-icon-btn--danger" title="Delete" onClick={onDelete}>🗑</button>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="fb-preview-field__label">
          {field.label || typeDef?.label || field.type}
          {(field.validation?.required || field.required) && (
            <span className="fb-preview-field__required">*</span>
          )}
        </div>
      )}

      {/* Simulated control */}
      <SimField field={field} />

      {/* Span badge */}
      <div className="fb-span-badge">{field.span || 24}/24</div>
    </div>
  );
};

/* ──────────────────────────────────────────
   RowDropZone — thin droppable strip between rows
──────────────────────────────────────────── */
const RowDropZone = ({ afterRowId, onDropAsNewRow }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`fb-row-dropzone${active ? " fb-row-dropzone--active" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => { e.preventDefault(); setActive(false); onDropAsNewRow(afterRowId); }}
    >
      {active && <span className="fb-row-dropzone__label">Drop here to create a new row</span>}
    </div>
  );
};

/* ──────────────────────────────────────────
   RowContainer
──────────────────────────────────────────── */
const RowContainer = ({
  row, rowIndex, totalRows, selected,
  onSelectField, onDeleteField, onDuplicateField, onMoveField,
  onDeleteRow, onDuplicateRow, onMoveRow, onAddFieldToRow,
  onDragStart, onDropOnRow, onDropOnField,
}) => {
  const [rowDragOver, setRowDragOver] = useState(false);
  const isRowSelected = selected?.rowId === row._id;

  return (
    <div
      className={[
        "fb-row-container",
        isRowSelected ? "fb-row-container--active" : "",
        rowDragOver   ? "fb-row-container--dragover" : "",
      ].join(" ")}
      /* Drop whole row = append to end of this row */
      onDragOver={(e) => { e.preventDefault(); setRowDragOver(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setRowDragOver(false); }}
      onDrop={(e) => { e.preventDefault(); setRowDragOver(false); onDropOnRow(row._id); }}
    >
      {/* Row toolbar */}
      <div className="fb-row-toolbar">
        <span className="fb-row-label">
          Row {rowIndex + 1}
          <span className="fb-row-count">{row.fields.length} field{row.fields.length !== 1 ? "s" : ""}</span>
        </span>
        <div className="fb-row-actions">
          <button className="fb-btn fb-btn--add-field" title="Add field to this row"
            onClick={() => onAddFieldToRow(null, row._id)}>
            ⊕ Add Field to Row
          </button>
          <button className="fb-icon-btn" title="Move Up"    onClick={() => onMoveRow(row._id, -1)} disabled={rowIndex === 0}>↑</button>
          <button className="fb-icon-btn" title="Move Down"  onClick={() => onMoveRow(row._id,  1)} disabled={rowIndex === totalRows - 1}>↓</button>
          <button className="fb-icon-btn" title="Duplicate Row" onClick={() => onDuplicateRow(row._id)}>⧉</button>
          <button className="fb-icon-btn fb-icon-btn--danger" title="Delete Row" onClick={() => onDeleteRow(row._id)}>🗑</button>
        </div>
      </div>

      {/* Fields side-by-side */}
      <div className="fb-row-fields">
        {row.fields.map((field, fi) => (
          <FieldCard
            key={field._id}
            field={field}
            rowId={row._id}
            isSelected={selected?.fieldId === field._id}
            isFirstInRow={fi === 0}
            isLastInRow={fi === row.fields.length - 1}
            onSelect={() => onSelectField(row._id, field._id)}
            onDelete={() => onDeleteField(row._id, field._id)}
            onDuplicate={() => onDuplicateField(row._id, field._id)}
            onMoveLeft={() => onMoveField(row._id, field._id, -1)}
            onMoveRight={() => onMoveField(row._id, field._id, 1)}
            onDragStart={onDragStart}
            onDropOnField={onDropOnField}
          />
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────
   FormCanvas — main export
──────────────────────────────────────────── */
const FormCanvas = ({
  rows, selected, formMeta,
  onSelectField, onDeleteField, onDuplicateField, onMoveField,
  onDeleteRow, onDuplicateRow, onMoveRow, onAddFieldToRow,
  onDragStart, onDropOnRow, onDropAsNewRow,
}) => {
  return (
    <div className="fb-designer">
      <div className="fb-form-preview">
        {/* Form header */}
        <div className="fb-form-preview__header">
          <h2 className="fb-form-preview__title">{formMeta?.sectionTitle || "My Form"}</h2>
          {formMeta?.description && <p className="fb-form-preview__desc">{formMeta.description}</p>}
        </div>

        {/* Body */}
        <div className="fb-form-preview__body">
          {rows.length === 0 ? (
            <div className="fb-form-preview__empty">
              <div className="fb-form-preview__empty-icon">🏗️</div>
              <p className="fb-form-preview__empty-title">Your form is empty</p>
              <p className="fb-form-preview__empty-hint">Click a field type in the left panel to start building</p>
            </div>
          ) : (
            <>
              {rows.map((row, ri) => (
                <React.Fragment key={row._id}>
                  <RowContainer
                    row={row}
                    rowIndex={ri}
                    totalRows={rows.length}
                    selected={selected}
                    onSelectField={onSelectField}
                    onDeleteField={onDeleteField}
                    onDuplicateField={onDuplicateField}
                    onMoveField={onMoveField}
                    onDeleteRow={onDeleteRow}
                    onDuplicateRow={onDuplicateRow}
                    onMoveRow={onMoveRow}
                    onAddFieldToRow={onAddFieldToRow}
                    onDragStart={onDragStart}
                    onDropOnRow={onDropOnRow}
                    onDropOnField={onDropOnRow} /* field-level drop uses row drop handler */
                  />
                  {/* Drop zone between rows */}
                  <RowDropZone afterRowId={row._id} onDropAsNewRow={onDropAsNewRow} />
                </React.Fragment>
              ))}

              <div style={{ marginTop: 8 }}>
                <div className="fb-sim-submit">{formMeta?.submitLabel || "Submit"}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCanvas;
