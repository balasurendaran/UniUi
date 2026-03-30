import React from "react";
import { FIELD_TYPES, PALETTE_GROUPS } from "./field-types";

/**
 * Left sidebar field palette.
 * - Click any tile → adds a new row with that field
 * - When a row is selected, shows an "Add to selected row" hint
 */
const FieldPalette = ({ onAddField, onAddFieldToRow, selectedRowId }) => {
  return (
    <aside className="fb-palette">
      <div className="fb-palette__header">
        <p className="fb-palette__title">Field Types</p>
        {selectedRowId ? (
          <p className="fb-palette__subtitle" style={{ color: "#a78bfa" }}>
            Click → new row &nbsp;|&nbsp; ⊕ adds to current row
          </p>
        ) : (
          <p className="fb-palette__subtitle">Click to add as new row</p>
        )}
      </div>

      <div className="fb-palette__scroll">
        {PALETTE_GROUPS.map((group) => {
          const fields = FIELD_TYPES.filter((f) => f.group === group);
          return (
            <div key={group}>
              <p className="fb-palette__group-label">{group}</p>
              {fields.map((field) => (
                <div key={field.type} className="fb-palette__item-wrap">
                  {/* Main tile — always adds a NEW row */}
                  <div
                    className="fb-palette__item"
                    onClick={() => onAddField(field)}
                    title={`Add ${field.label} as new row`}
                  >
                    <div className="fb-palette__icon" style={{ background: field.bg }}>
                      {field.icon}
                    </div>
                    <span className="fb-palette__label">{field.label}</span>
                  </div>

                  {/* ⊕ button — adds to the currently selected row */}
                  {selectedRowId && onAddFieldToRow && (
                    <button
                      className="fb-palette__add-to-row"
                      title={`Add ${field.label} to selected row`}
                      onClick={(e) => { e.stopPropagation(); onAddFieldToRow(field); }}
                    >
                      ⊕
                    </button>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default FieldPalette;
