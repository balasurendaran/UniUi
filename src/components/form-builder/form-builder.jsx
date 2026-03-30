import React, { useState, useCallback, useRef } from "react";
import "./form-builder.css";
import FieldPalette from "./field-palette";
import FormCanvas from "./form-canvas";
import FieldConfigPanel from "./field-config-panel";
import FormFields from "components/form-fields";

/* ─────────────────────────────────────────────
   ID generator
───────────────────────────────────────────── */
let _cnt = 0;
const uid = (prefix = "id") => `${prefix}_${++_cnt}_${Date.now() % 1e6}`;

/* ─────────────────────────────────────────────
   formConfig builder
   rows[] → fieldGroups[] (plug-and-play with <FormFields />)
───────────────────────────────────────────── */
const buildFormConfig = (rows, meta) => {
  const fieldGroups = rows.map((row, ri) => ({
    key: row._id || `row_${ri + 1}`,
    fields: row.fields.map(({ _id, ...rest }) => { // eslint-disable-line no-unused-vars
      if (rest.validation) {
        Object.keys(rest.validation).forEach((k) => {
          if (rest.validation[k] === undefined || rest.validation[k] === "")
            delete rest.validation[k];
        });
        if (Object.keys(rest.validation).length === 0) delete rest.validation;
      }
      return rest;
    }),
  }));

  return {
    sections: [
      {
        key: "section_1",
        title: meta.sectionTitle || "Form",
        visible: true,
        className: meta.sectionClass || "",
        description: meta.description || "",
        fieldGroups,
      },
    ],
    submitButton: {
      children: meta.submitLabel || "Submit",
      type: "primary",
      className: "",
      style: { marginTop: "20px" },
    },
    previewValues: { visible: false },
  };
};

const cloneRow = (row) => ({
  ...row,
  _id: uid("row"),
  fields: row.fields.map((f) => ({ ...f, _id: uid("fld"), name: `${f.name}_copy` })),
});

const redistributeSpans = (fields) => {
  const even = Math.floor(24 / fields.length);
  return fields.map((f, i) => ({
    ...f,
    span: i === fields.length - 1 ? 24 - even * (fields.length - 1) : even,
  }));
};

/* ─────────────────────────────────────────────
   Main FormBuilder
───────────────────────────────────────────── */
const FormBuilder = ({ onExport }) => {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null); // { rowId, fieldId }
  const [activeTab, setActiveTab] = useState("designer");
  const [copied, setCopied] = useState(false);
  const [previewResult, setPreviewResult] = useState(null); // null | { data, ts }
  const [formMeta, setFormMeta] = useState({
    sectionTitle: "My Form",
    submitLabel: "Submit",
    description: "",
    sectionClass: "",
  });

  // Drag state (stored in ref to avoid re-render during drag)
  const dragRef = useRef(null); // { rowId, fieldId }

  /* ── Derived ── */
  const totalFields = rows.reduce((s, r) => s + r.fields.length, 0);
  const requiredCount = rows.reduce(
    (s, r) => s + r.fields.filter((f) => f.validation?.required || f.required).length,
    0
  );
  const selectedField = (() => {
    if (!selected) return null;
    const row = rows.find((r) => r._id === selected.rowId);
    return row?.fields.find((f) => f._id === selected.fieldId) || null;
  })();

  const formConfig = buildFormConfig(rows, formMeta);
  const jsonString = JSON.stringify(formConfig, null, 2);

  const updateMeta = (key, val) => setFormMeta((m) => ({ ...m, [key]: val }));

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  /* ── Preview ── */
  const handlePreviewSubmit = (data) => {
    setPreviewResult({ data, ts: new Date().toLocaleTimeString() });
  };
  const handlePreviewReset = () => setPreviewResult(null);

  /* ════════════════════════════════════════
     Row-level operations
  ════════════════════════════════════════ */
  const addFieldAsNewRow = useCallback((typeDef) => {
    const fieldId = uid("fld");
    const rowId = uid("row");
    setRows((prev) => [...prev, { _id: rowId, fields: [makeField(typeDef, fieldId)] }]);
    setSelected({ rowId, fieldId });
  }, []);

  const addFieldToRow = useCallback((typeDef, rowId) => {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r._id === rowId);
      if (idx === -1) return prev;
      const fieldId = uid("fld");
      const newFields = [...prev[idx].fields, makeField(typeDef, fieldId)];
      const updated = [...prev];
      updated[idx] = { ...prev[idx], fields: redistributeSpans(newFields) };
      setSelected({ rowId, fieldId });
      return updated;
    });
  }, []);

  const duplicateRow = useCallback((rowId) => {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r._id === rowId);
      if (idx === -1) return prev;
      const clone = cloneRow(prev[idx]);
      const next = [...prev];
      next.splice(idx + 1, 0, clone);
      return next;
    });
  }, []);

  const deleteRow = useCallback((rowId) => {
    setRows((prev) => prev.filter((r) => r._id !== rowId));
    setSelected((s) => (s?.rowId === rowId ? null : s));
  }, []);

  const moveRow = useCallback((rowId, dir) => {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r._id === rowId);
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }, []);

  /* ════════════════════════════════════════
     Field-level operations
  ════════════════════════════════════════ */
  const updateField = useCallback((rowId, updatedField) => {
    setRows((prev) =>
      prev.map((r) =>
        r._id === rowId
          ? { ...r, fields: r.fields.map((f) => (f._id === updatedField._id ? updatedField : f)) }
          : r
      )
    );
  }, []);

  const duplicateField = useCallback((rowId, fieldId) => {
    setRows((prev) => {
      const rowIdx = prev.findIndex((r) => r._id === rowId);
      if (rowIdx === -1) return prev;
      const row = prev[rowIdx];
      const fIdx = row.fields.findIndex((f) => f._id === fieldId);
      if (fIdx === -1) return prev;
      const clone = { ...row.fields[fIdx], _id: uid("fld"), name: `${row.fields[fIdx].name}_copy` };
      const newFields = [...row.fields];
      newFields.splice(fIdx + 1, 0, clone);
      const updated = [...prev];
      updated[rowIdx] = { ...row, fields: redistributeSpans(newFields) };
      setSelected({ rowId, fieldId: clone._id });
      return updated;
    });
  }, []);

  const deleteField = useCallback((rowId, fieldId) => {
    setRows((prev) => {
      const rowIdx = prev.findIndex((r) => r._id === rowId);
      if (rowIdx === -1) return prev;
      const row = prev[rowIdx];
      const newFields = row.fields.filter((f) => f._id !== fieldId);
      if (newFields.length === 0) return prev.filter((r) => r._id !== rowId);
      const updated = [...prev];
      updated[rowIdx] = { ...row, fields: redistributeSpans(newFields) };
      return updated;
    });
    setSelected((s) => (s?.rowId === rowId && s?.fieldId === fieldId ? null : s));
  }, []);

  const moveFieldInRow = useCallback((rowId, fieldId, dir) => {
    setRows((prev) => {
      const rowIdx = prev.findIndex((r) => r._id === rowId);
      if (rowIdx === -1) return prev;
      const row = prev[rowIdx];
      const fIdx = row.fields.findIndex((f) => f._id === fieldId);
      const target = fIdx + dir;
      if (target < 0 || target >= row.fields.length) return prev;
      const newFields = [...row.fields];
      [newFields[fIdx], newFields[target]] = [newFields[target], newFields[fIdx]];
      const updated = [...prev];
      updated[rowIdx] = { ...row, fields: newFields };
      return updated;
    });
  }, []);

  /* ════════════════════════════════════════
     Drag-and-Drop — move field between rows
     Uses HTML5 native drag API (no deps)
  ════════════════════════════════════════ */
  const handleDragStart = useCallback((rowId, fieldId) => {
    dragRef.current = { rowId, fieldId };
  }, []);

  const handleDropOnRow = useCallback((targetRowId, targetFieldId = null) => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.rowId === targetRowId && drag.fieldId === targetFieldId) return;

    setRows((prev) => {
      // Pull the dragged field out
      const srcRowIdx = prev.findIndex((r) => r._id === drag.rowId);
      if (srcRowIdx === -1) return prev;
      const srcRow = prev[srcRowIdx];
      const draggedField = srcRow.fields.find((f) => f._id === drag.fieldId);
      if (!draggedField) return prev;

      let next = [...prev];

      // Remove from source row
      const srcFields = srcRow.fields.filter((f) => f._id !== drag.fieldId);
      if (srcFields.length === 0) {
        // Delete empty source row
        next = next.filter((r) => r._id !== drag.rowId);
      } else {
        const srcIdx = next.findIndex((r) => r._id === drag.rowId);
        next[srcIdx] = { ...srcRow, fields: redistributeSpans(srcFields) };
      }

      // Insert into target row
      const tgtRowIdx = next.findIndex((r) => r._id === targetRowId);
      if (tgtRowIdx === -1) return next;
      const tgtRow = next[tgtRowIdx];
      let tgtFields = [...tgtRow.fields];

      if (targetFieldId) {
        // Insert before the target field
        const beforeIdx = tgtFields.findIndex((f) => f._id === targetFieldId);
        tgtFields.splice(beforeIdx >= 0 ? beforeIdx : tgtFields.length, 0, draggedField);
      } else {
        tgtFields.push(draggedField);
      }

      next[tgtRowIdx] = { ...tgtRow, fields: redistributeSpans(tgtFields) };
      setSelected({ rowId: targetRowId, fieldId: drag.fieldId });
      return next;
    });

    dragRef.current = null;
  }, []);

  const handleDropAsNewRow = useCallback((afterRowId) => {
    const drag = dragRef.current;
    if (!drag) return;

    setRows((prev) => {
      const srcRowIdx = prev.findIndex((r) => r._id === drag.rowId);
      if (srcRowIdx === -1) return prev;
      const srcRow = prev[srcRowIdx];
      const draggedField = srcRow.fields.find((f) => f._id === drag.fieldId);
      if (!draggedField) return prev;

      let next = [...prev];

      // Remove from source
      const srcFields = srcRow.fields.filter((f) => f._id !== drag.fieldId);
      if (srcFields.length === 0) {
        next = next.filter((r) => r._id !== drag.rowId);
      } else {
        const si = next.findIndex((r) => r._id === drag.rowId);
        next[si] = { ...srcRow, fields: redistributeSpans(srcFields) };
      }

      // Create new row after afterRowId
      const afterIdx = next.findIndex((r) => r._id === afterRowId);
      const newRowId = uid("row");
      const newRow = { _id: newRowId, fields: [{ ...draggedField, span: 24 }] };
      next.splice(afterIdx + 1, 0, newRow);
      setSelected({ rowId: newRowId, fieldId: drag.fieldId });
      return next;
    });

    dragRef.current = null;
  }, []);

  /* ── Clear / Export ── */
  const clearAll = () => {
    if (rows.length === 0) return;
    if (window.confirm("Clear all rows? This cannot be undone.")) {
      setRows([]);
      setSelected(null);
    }
  };

  const handleExport = () => {
    setActiveTab("json");
    if (onExport) onExport(formConfig);
  };

  /* ════════════════════════════════════════
     Render
  ════════════════════════════════════════ */
  return (
    <div className="fb-root">
      {/* Left: Palette */}
      <FieldPalette
        onAddField={addFieldAsNewRow}
        onAddFieldToRow={selected?.rowId ? (td) => addFieldToRow(td, selected.rowId) : null}
        selectedRowId={selected?.rowId || null}
      />

      {/* Center */}
      <div className="fb-main">
        {/* Top bar */}
        <div className="fb-topbar">
          <span className="fb-topbar__logo">⚡ UniUi Form Builder</span>
          <div className="fb-topbar__meta">
            <input className="fb-input" value={formMeta.sectionTitle}
              onChange={(e) => updateMeta("sectionTitle", e.target.value)} placeholder="Form title" />
            <input className="fb-input" value={formMeta.description}
              onChange={(e) => updateMeta("description", e.target.value)} placeholder="Description (optional)" />
            <input className="fb-input" value={formMeta.submitLabel}
              onChange={(e) => updateMeta("submitLabel", e.target.value)} placeholder="Submit label" style={{ maxWidth: 140 }} />
          </div>
        </div>

        {/* Tab bar */}
        <div className="fb-tabs">
          <div className="fb-tabs__left">
            {[
              { id: "designer", label: "🎨 Designer" },
              { id: "preview",  label: "👁 Preview" },
              { id: "json",     label: "{ } JSON Config" },
            ].map(({ id, label }) => (
              <div key={id}
                className={`fb-tab${activeTab === id ? " fb-tab--active" : ""}`}
                onClick={() => { setActiveTab(id); if (id !== "preview") setPreviewResult(null); }}
              >
                {label}
                {id === "json" && totalFields > 0 && (
                  <span className="fb-stats-badge" style={{ marginLeft: 6 }}>{totalFields}</span>
                )}
              </div>
            ))}
          </div>
          <div className="fb-tabs__right">
            <button className="fb-btn fb-btn--danger-ghost" onClick={clearAll} disabled={rows.length === 0}>
              🗑 Clear all
            </button>
            <button className="fb-btn fb-btn--primary" onClick={handleExport} disabled={rows.length === 0}>
              {"{ }"} View formConfig
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="fb-content">

          {/* ── Designer ── */}
          {activeTab === "designer" && (
            <FormCanvas
              rows={rows}
              selected={selected}
              formMeta={formMeta}
              onSelectField={(rowId, fieldId) => setSelected({ rowId, fieldId })}
              onDeleteField={deleteField}
              onDuplicateField={duplicateField}
              onMoveField={moveFieldInRow}
              onDeleteRow={deleteRow}
              onDuplicateRow={duplicateRow}
              onMoveRow={moveRow}
              onAddFieldToRow={addFieldToRow}
              onDragStart={handleDragStart}
              onDropOnRow={handleDropOnRow}
              onDropAsNewRow={handleDropAsNewRow}
              dragRef={dragRef}
            />
          )}

          {/* ── Preview ── */}
          {activeTab === "preview" && (
            <div className="fb-preview-tab">
              {rows.length === 0 ? (
                <div className="fb-config-empty" style={{ opacity: 0.5, height: "100%" }}>
                  <div className="fb-config-empty__icon">👁</div>
                  <p className="fb-config-empty__text">Add fields in the Designer tab to preview your form</p>
                </div>
              ) : (
                <div className="fb-preview-tab__wrap">

                  {/* Left: live interactive form */}
                  <div className="fb-preview-tab__form-col">
                    <div className="fb-preview-tab__badge">
                      👁 Preview — fill in the form and hit Submit to test validation
                    </div>
                    <div className="fb-preview-tab__paper">
                      <FormFields
                        key={JSON.stringify(rows.map(r => r._id))}
                        formConfig={formConfig}
                        onSubmit={handlePreviewSubmit}
                      />
                    </div>
                  </div>

                  {/* Right: submitted values or instructions */}
                  <div className="fb-preview-tab__result-col">
                    {previewResult ? (
                      <div className="fb-preview-result">
                        <div className="fb-preview-result__header">
                          <span>✅ Submitted successfully</span>
                          <span className="fb-preview-result__ts">{previewResult.ts}</span>
                        </div>
                        <p className="fb-preview-result__hint">
                          These are the values your <code>onSubmit</code> handler receives:
                        </p>
                        <pre className="fb-code-block" style={{ fontSize: 12, flex: 1 }}>
                          {JSON.stringify(previewResult.data, null, 2)}
                        </pre>
                        <button
                          className="fb-btn fb-btn--ghost"
                          style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
                          onClick={handlePreviewReset}
                        >
                          ↺ Reset &amp; Try Again
                        </button>
                      </div>
                    ) : (
                      <div className="fb-preview-hints">
                        <p className="fb-preview-hints__title">How Preview works</p>
                        <ul className="fb-preview-hints__list">
                          <li><span>✏️</span> Fill in the fields on the left</li>
                          <li><span>⚠️</span> Errors appear as you type (required, min/max length, pattern)</li>
                          <li><span>✅</span> Hit Submit — see the submitted JSON values here</li>
                          <li><span>↺</span> Reset to test again with different values</li>
                          <li><span>🎨</span> Switch to <strong>Designer</strong> to edit fields, then return to re-test</li>
                        </ul>
                        <div className="fb-preview-hints__tip">
                          <strong>Plug-and-play:</strong> copy the formConfig from the JSON tab and pass it to{" "}
                          <code>{"<FormFields onSubmit={handler} />"}</code>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ── JSON Config ── */}
          {activeTab === "json" && (
            <div className="fb-json-tab">
              <div className="fb-json-tab__toolbar">
                <p className="fb-json-tab__info">
                  Paste this <code>formConfig</code> into{" "}
                  <code>{"<FormFields formConfig={...} />"}</code> — plug-and-play.
                </p>
                <div className="fb-json-tab__actions">
                  <button className="fb-btn fb-btn--ghost" onClick={() => setActiveTab("designer")}>← Designer</button>
                  <button
                    className={`fb-btn ${copied ? "fb-btn--success" : "fb-btn--primary"}`}
                    onClick={handleCopy} disabled={rows.length === 0}
                  >
                    {copied ? "✓ Copied!" : "⎘ Copy formConfig"}
                  </button>
                </div>
              </div>
              {rows.length === 0 ? (
                <div className="fb-config-empty" style={{ opacity: 0.5, flex: 1 }}>
                  <div className="fb-config-empty__icon">📋</div>
                  <p className="fb-config-empty__text">Add fields in the Designer tab first</p>
                </div>
              ) : (
                <pre className="fb-code-block">{jsonString}</pre>
              )}
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="fb-stats-bar">
          <div className="fb-stats-bar__count">
            <span>Rows</span><span className="fb-stats-badge">{rows.length}</span>
            <span style={{ marginLeft: 8 }}>Fields</span><span className="fb-stats-badge">{totalFields}</span>
            <span style={{ marginLeft: 8 }}>Required</span><span className="fb-stats-badge">{requiredCount}</span>
          </div>
          <div>
            {activeTab === "designer"
              ? (selectedField
                  ? `✎ Editing: ${selectedField.label || selectedField.name}`
                  : "Click field to configure • Drag fields between rows • ⊕ adds to selected row")
              : activeTab === "preview"
              ? "Fill the form and submit to test — validation errors show live"
              : "Copy the formConfig and paste into <FormFields formConfig={...} />"}
          </div>
        </div>
      </div>

      {/* Right: Config Panel (hidden in preview/json) */}
      {activeTab === "designer" && (
        <FieldConfigPanel
          field={selectedField}
          onChange={(updated) => selected && updateField(selected.rowId, updated)}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Field factory
───────────────────────────────────────────── */
function makeField(typeDef, id) {
  return {
    _id: id,
    type: typeDef.type,
    name: `${typeDef.type}_${Date.now() % 100000}`,
    label: typeDef.defaults?.label || typeDef.label,
    placeholder: typeDef.defaults?.placeholder || "",
    readOnly: false,
    className: "",
    span: 24,
    ...(typeDef.defaults || {}),
  };
}

export default FormBuilder;
