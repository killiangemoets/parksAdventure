import { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import {
  AddTourImagesContainer,
  AddTourImagesTitle,
  AddTourImagesWrapper,
  ErrorMessage,
} from "./addTourImages.style";
import Modal from "../../../UIComponents/modal/modal.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import { CREATE_TOUR_DATA } from "../../../../types/tour";
import convertToBase64 from "../../../../utils/images-treatment/convert-base-64";

export type AddTourImagesProps = {
  images: UploadFile[];
  handleChange: (images: UploadFile[], name: string) => void;
  error: boolean;
};

const AddTourImages: FC<AddTourImagesProps> = ({
  images,
  handleChange,
  error,
}) => {
  const maxImages = 20;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    onSuccess("Ok");
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await convertToBase64(file.originFileObj as RcFile);
    }
    console.log(file.preview);

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newImagesList }) => {
    while (newImagesList.length > maxImages) {
      newImagesList.pop();
    }
    handleChange(newImagesList, CREATE_TOUR_DATA.images);
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
            defaultFileList={images}
            // fileList={images}
            onPreview={handlePreview}
            multiple={true}
            onChange={onChange}
          >
            {images.length >= maxImages ? null : uploadButton}
          </Upload>
        </ConfigProvider>
        <Modal
          handleClose={handleCloseModal}
          open={previewOpen}
          title={"Tour image preview"}
        >
          <img alt="preview content" src={previewImage} />
        </Modal>
        <ErrorMessage>
          {error ? "A tour must have at least 4 images" : ""}
        </ErrorMessage>
      </AddTourImagesWrapper>
    </AddTourImagesContainer>
  );
};

export default AddTourImages;
