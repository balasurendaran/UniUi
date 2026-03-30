import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useController } from "react-hook-form";

const UniUiUpload = ({
  name,
  // control,
  successMessage = "File uploaded successfully!",
  fileUpload,
  fileURLLink,
  beforeUpload,
  ...rest
}) => {
  console.log("🚀 ~ fileUpload:", fileUpload);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    // control,
  });
  console.log("UniUiUpload component rendered", fileURLLink);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const event = { target: { files: [file] } };
      const uploadedURL = await fileUpload(event, successMessage);
      onChange(uploadedURL); // Update react-hook-form value
      onSuccess(uploadedURL);
    } catch (err) {
      onError(err);
    }
  };

  return (
    <div>
      <Upload
        name={name}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        showUploadList={false}
        maxCount={1}
        {...rest}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      {value && (
        <div style={{ marginTop: 8 }}>
          <img
            src={value}
            alt="Uploaded preview"
            style={{ maxWidth: "100%", maxHeight: 200 }}
          />
        </div>
      )}
    </div>
  );
};

export default UniUiUpload;
