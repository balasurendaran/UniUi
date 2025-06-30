import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const UniUiFileUpload = ({ fileList }) => (
  <Upload
    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    listType="picture"
    defaultFileList={fileList}
  >
    <Button type="primary" icon={<UploadOutlined />}>
      Upload
    </Button>
  </Upload>
);
export default UniUiFileUpload;
