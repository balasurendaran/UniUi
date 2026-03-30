/**
 * Registry of all field types available in the Form Builder palette.
 * Each entry defines how the field looks in the palette and its default config.
 */
export const FIELD_TYPES = [
  // ── Text Inputs ──────────────────────────────────────────
  {
    type: "text",
    label: "Text",
    icon: "📝",
    color: "#6c72ff",
    bg: "rgba(108,114,255,0.12)",
    group: "Text Inputs",
    defaults: { label: "Text Field", placeholder: "Enter text", required: false },
  },
  {
    type: "textArea",
    label: "Textarea",
    icon: "🗒️",
    color: "#6c72ff",
    bg: "rgba(108,114,255,0.12)",
    group: "Text Inputs",
    defaults: { label: "Textarea", placeholder: "Enter description", required: false, rows: 4 },
  },
  {
    type: "email",
    label: "Email",
    icon: "✉️",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    group: "Text Inputs",
    defaults: {
      label: "Email Address",
      placeholder: "your@email.com",
      required: false,
      validation: {
        pattern: { value: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i", message: "Invalid email address" },
      },
    },
  },
  {
    type: "password",
    label: "Password",
    icon: "🔒",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    group: "Text Inputs",
    defaults: { label: "Password", placeholder: "Enter password", required: false },
  },
  {
    type: "number",
    label: "Number",
    icon: "#️⃣",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.12)",
    group: "Text Inputs",
    defaults: { label: "Number", placeholder: "0", required: false },
  },

  // ── Selection ─────────────────────────────────────────────
  {
    type: "dropdown",
    label: "Dropdown",
    icon: "🔽",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    group: "Selection",
    defaults: {
      label: "Select Option",
      required: false,
      options: [
        { key: "option_1", label: "Option 1" },
        { key: "option_2", label: "Option 2" },
      ],
    },
  },
  {
    type: "radio",
    label: "Radio Group",
    icon: "⭕",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    group: "Selection",
    defaults: {
      label: "Choose One",
      required: false,
      options: [
        { value: "option_1", label: "Option 1" },
        { value: "option_2", label: "Option 2" },
      ],
    },
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: "☑️",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    group: "Selection",
    defaults: { label: "Agreement", required: false },
  },

  // ── Date & Time ───────────────────────────────────────────
  {
    type: "datePicker",
    label: "Date Picker",
    icon: "📅",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    group: "Date & Time",
    defaults: { label: "Select Date", placeholder: "Pick a date", required: false },
  },
  {
    type: "timePicker",
    label: "Time Picker",
    icon: "🕐",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    group: "Date & Time",
    defaults: { label: "Select Time", placeholder: "Pick a time", required: false },
  },

  // ── Special ───────────────────────────────────────────────
  {
    type: "phoneInput",
    label: "Phone Number",
    icon: "📞",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    group: "Special",
    defaults: { label: "Phone Number", placeholder: "Enter phone", required: false },
  },
  {
    type: "switch",
    label: "Toggle Switch",
    icon: "🔀",
    color: "#84cc16",
    bg: "rgba(132,204,22,0.12)",
    group: "Special",
    defaults: { label: "Enable Feature", required: false, defaultValue: false },
  },
  {
    type: "otP",
    label: "OTP Input",
    icon: "🔢",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    group: "Special",
    defaults: { label: "One-Time Password", required: false },
  },
  {
    type: "fileUpload",
    label: "File Upload",
    icon: "📎",
    color: "#64748b",
    bg: "rgba(100,116,139,0.12)",
    group: "Special",
    defaults: { label: "Upload File", required: false, dragger: false },
  },
];

/** Groups ordered for palette display */
export const PALETTE_GROUPS = ["Text Inputs", "Selection", "Date & Time", "Special"];

/** Look up a field type definition by its type string */
export const getFieldType = (type) => FIELD_TYPES.find((f) => f.type === type);
