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
import UniUiButton from "components/button";
import UniUiLabel from "components/label";
import UniUiActionButtons from "components/action-buttons";

export const fieldMapper = {
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
