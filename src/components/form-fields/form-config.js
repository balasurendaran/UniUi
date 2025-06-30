import { ONLY_LETTERS } from "components/constants/form-configs";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const userRoleOptions = [
  {
    key: "1",
    label: "1st menu item",
  },
  {
    key: "2",
    label: "2nd menu item (disabled)",
    // icon: <SmileOutlined />,
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

export const formConfig = {
  sections: [
    {
      key: "user_section",
      title: "User Information",
      visible: true,
      fieldGroups: [
        {
          key: "user_row_1",
          fields: [
            {
              type: "text",
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
              name: "lastName",
              label: "Last Name",
              placeholder: "Enter your last name",
              span: 12,
              validation: { required: "Last name is required" },
            },
          ],
        },
        {
          key: "user_row_2",
          fields: [
            {
              type: "radio",
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
          ],
        },
        {
          key: "password_row_1",
          fields: [
            {
              type: "password",
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
      ],
    },
    {
      key: "account_section",
      title: "Account Settings",
      visible: (values) => values.userType === "admin",
      fieldGroups: [
        {
          fields: [
            {
              type: "dropdown",
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
      fieldGroups: [
        {
          key: "date_time_row_1",
          fields: [
            {
              type: "datePicker",
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
  ],
  submitButton: {
    children: "Submit Form",
    type: "primary",
    disabled: (values) => !values?.terms,
    style: { marginTop: "20px" },
  },
};
