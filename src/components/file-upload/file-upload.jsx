import React from "react";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const { Dragger } = Upload;

const UniUiFileUpload = ({ fileList, dragger = false, ...props }) => {
  if (dragger) {
    return (
      <Dragger
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        defaultFileList={fileList}
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Dragger>
    );
  }
  return (
    <Upload
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      listType="picture"
      defaultFileList={fileList}
      {...props}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default UniUiFileUpload;
