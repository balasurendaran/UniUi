import { ONLY_LETTERS } from "components/constants/form-configs";

const userRoleOptions = [
  {
    key: "1",
    label: "1st menu item",
  },
  {
    key: "2",
    label: "2nd menu item (disabled)",
    disabled: true,
  },
  {
    key: "3",
    label: "3rd menu item (disabled)",
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const actions = [
  { type: "add", label: "Add", icon: "plus", size: "small" },
  { type: "edit", label: "Edit", icon: "edit", size: "small" },
  { type: "delete", label: "Delete", icon: "trashBin", size: "small" },
  { type: "view", label: "View", icon: "eye", size: "small" },
  // { type: "hide", label: "Hide", icon: "eyeSlash", size: "small" },
  { type: "copy", label: "Copy", icon: "fileCopy", size: "small" },
  // { type: "duplicate", label: "Duplicate", icon: "fileClone", size: "small" },
  { type: "moveUp", label: "Move Up", icon: "arrowUp", size: "small" },
  { type: "moveDown", label: "Move Down", icon: "arrowDown", size: "small" },
];

export const formConfig = {
  sections: [
    {
      key: "user_section",
      title: "User Information",
      visible: true,
      className: "user-section",
      description: "Please fill in your personal information",
      actions: actions,
      fieldGroups: [
        {
          key: "user_row_1",
          fields: [
            {
              type: "text",
              className: "",
              readOnly: false,
              name: "firstName",
              label: "First Name",
              placeholder: "Enter your first name",
              span: 12,
              validation: {
                required: "First name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: {
                  value: 20,
                  message: "First name cannot exceed 20 characters",
                },
                pattern: {
                  value: ONLY_LETTERS,
                  message: "Only letters allowed",
                },
                validate: (value) =>
                  value !== "admin" || "Cannot use 'admin' as value",
              },
            },
            {
              type: "text",
              className: "",
              readOnly: false,
              name: "lastName",
              label: "Last Name",
              placeholder: "Enter your last name",
              span: 12,
              validation: { required: "Last name is required" },
            },
          ],
          actions: actions,
        },
        {
          key: "user_row_2",
          fields: [
            {
              type: "radio",
              className: "",
              readOnly: false,
              name: "userType",
              label: "User Type",
              span: 24,
              options: [
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "guest", label: "Guest" },
              ],
              validation: { required: "User type is required" },
            },
            {
              type: "switch",
              className: "",
              readOnly: false,
              name: "newsletter",
              label: "Subscribe to Newsletter",
              span: 24,
              defaultValue: false,
            },
          ],
        },
        {
          key: "password_row_1",
          fields: [
            {
              type: "password",
              className: "",
              readOnly: false,
              name: "password",
              label: "Password",
              placeholder: "Enter your password",
              span: 24,
              validation: {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              },
            },
          ],
        },
        {
          key: "user_row_3",
          fields: [
            {
              type: "email",
              className: "",
              readOnly: false,
              name: "email",
              label: "Email",
              placeholder: "Enter your email",
              span: 24,
              md: 12,
              validation: {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              },
            },
          ],
        },
        {
          key: "user_row_4",
          fields: [
            {
              type: "textArea",
              className: "",
              readOnly: false,
              name: "bio",
              label: "Bio",
              placeholder: "Tell us about yourself",
              span: 24,
              validation: {
                required: "Bio is required",
                minLength: {
                  value: 10,
                  message: "Bio must be at least 10 characters",
                },
                maxLength: {
                  value: 300,
                  message: "Bio cannot exceed 300 characters",
                },
              },
            },
          ],
        },
        {
          key: "user_row_5",
          fields: [
            {
              type: "phoneInput",
              className: "",
              readOnly: false,
              name: "phone",
              label: "Phone Number",
              placeholder: "Enter your phone number",
              span: 12,
              validation: {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              },
            },
            {
              type: "otP",
              className: "",
              readOnly: false,
              name: "otp",
              label: "OTP",
              placeholder: "Enter the OTP",
              span: 12,
              validation: {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{4,6}$/,
                  message: "Enter a valid OTP",
                },
              },
            },
          ],
        },
      ],
    },
    {
      key: "account_section",
      title: "Account Settings",
      visible: (values) => values.userType === "admin",
      className: "",
      description: "",
      fieldGroups: [
        {
          fields: [
            {
              type: "dropdown",
              className: "",
              readOnly: false,
              name: "role",
              label: "User Role",
              span: 8,
              options: userRoleOptions,
              // options: [
              //   { key: "admin", label: "Admin" },
              //   { key: "user", label: "User" },
              //   { key: "guest", label: "Guest" },
              // ],
            },
            {
              type: "checkbox",
              className: "",
              readOnly: false,
              name: "terms",
              label: "Agreement",
              span: 16,
              preText: "I agree to the",
              linkText: "Terms and Conditions",
              navigate: () => window.open("/terms"),
              validation: { required: "You must accept the terms" },
            },
          ],
        },
      ],
    },
    {
      key: "date_time_section",
      title: "Date and Time",
      visible: true,
      className: "",
      description: "",
      fieldGroups: [
        {
          key: "date_time_row_1",
          fields: [
            {
              type: "datePicker",
              className: "",
              readOnly: false,
              name: "appointmentDate",
              label: "Appointment Date",
              placeholder: "Select a date",
              span: 12,
              validation: {
                required: "Date is required",
              },
            },
            {
              type: "timePicker",
              className: "",
              readOnly: false,
              name: "appointmentTime",
              label: "Appointment Time",
              placeholder: "Select a time",
              span: 12,
              validation: {
                required: "Time is required",
              },
            },
          ],
        },
      ],
    },
    {
      key: "upload_section",
      title: "File Uploads",
      visible: true,
      className: "",
      description: "",
      fieldGroups: [
        {
          key: "upload_row_1",
          fields: [
            {
              type: "fileUpload",
              className: "",
              readOnly: false,
              dragger: false,
              name: "file",
              label: "File Upload",
              placeholder: "Upload a file",
              span: 12,
              validation: {
                required: "Please upload a file",
              },
            },
            {
              type: "fileUpload",
              className: "",
              readOnly: false,
              dragger: true,
              name: "draggerFile",
              label: "Dragger Upload",
              placeholder: "Drag and drop a file here or click to upload",
              span: 12,
              validation: {
                required: "Please upload a file using dragger",
              },
            },
          ],
        },
      ],
    },
    {
      key: "actions_section",
      title: "",
      visible: true,
      className: "",
      description: "",
      fieldGroups: [
        {
          key: "actions_row_1",
          fields: [
            {
              type: "button",
              className: "",
              readOnly: false,
              name: "customButton",
              label: "Custom Action",
              span: 24,
              buttonProps: {
                type: "primary",
                children: "Custom Button",
                onClick: () => alert("Button clicked!"),
                style: { width: "100%" },
              },
            },
          ],
        },
      ],
    },
    {
      key: "image_upload_section",
      title: "Image Upload",
      visible: true,
      className: "",
      description: "",
      fieldGroups: [
        {
          key: "image_upload_row_1",
          fields: [
            {
              type: "fileUpload",
              className: "",
              readOnly: false,
              dragger: true,
              name: "image",
              label: "Upload Image",
              placeholder: "Drag and drop an image or click to upload",
              span: 24,
              validation: {
                required: "Please upload an image",
              },
            },
          ],
        },
      ],
    },
  ],
  submitButton: {
    children: "Submit Form",
    type: "primary",
    className: "",
    readOnly: false,
    disabled: (values) => !values?.terms,
    style: { marginTop: "20px" },
  },
  previewValues: {
    title: "Preview Values",
    className: "preview-values",
    readOnly: false,
    visible: true,
    style: { marginTop: "20px" },
  },
};
