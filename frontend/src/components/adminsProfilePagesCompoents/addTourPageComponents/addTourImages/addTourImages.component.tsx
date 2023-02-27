import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  AddTourImagesContainer,
  AddTourImagesTitle,
  AddTourImagesWrapper,
} from "./addTourImages.style";
import Modal from "../../../UIComponents/modal/modal.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddTourImages = () => {
  const maxImages = 20;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadImage = async (options: any) => {
    console.log(options);
    const { onSuccess, onError, file, onProgress } = options;
    onSuccess("Ok");
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    while (newFileList.length > maxImages) {
      console.log(newFileList);
      newFileList.pop();
    }
    setFileList(newFileList);
  };

  const handleCloseModal = () => {
    setPreviewOpen(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <AddTourImagesContainer>
      <AddTourImagesWrapper>
        <AddTourImagesTitle>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Tour images</Title>
        </AddTourImagesTitle>
        <ConfigProvider
          theme={{
            hashed: false,
          }}
        >
          <Upload
            accept="image/*"
            customRequest={uploadImage}
            listType="picture-card"
            defaultFileList={fileList}
            onPreview={handlePreview}
            multiple={true}
            onChange={handleChange}
          >
            {fileList.length >= maxImages ? null : uploadButton}
          </Upload>
        </ConfigProvider>
        <Modal
          handleClose={handleCloseModal}
          open={previewOpen}
          title={"Tour image preview"}
        >
          <img alt="preview content" src={previewImage} />
        </Modal>
      </AddTourImagesWrapper>
    </AddTourImagesContainer>
  );
};

export default AddTourImages;
