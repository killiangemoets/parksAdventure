import { ChangeEvent, FC, useState } from "react";
import {
  EyeIcon,
  ImageElement,
  ImageElementHover,
  ImagesInputContainer,
  ImagesInputElement,
  ImagesInputText,
  InputWrapper,
  PlusIcon,
  TrashIcon,
  UploadText,
} from "./imagesInput.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Modal from "../modal/modal.component";
import { CREATE_TOUR_DATA, TUploadTourImage } from "../../../types/tour";

const maxImages = 20;

export type ImagesInputProps = {
  images: TUploadTourImage[];
  handleChange: (images: TUploadTourImage[], name: string) => void;
};

const ImagesInput: FC<ImagesInputProps> = ({ images, handleChange }) => {
  const [previewImage, setPreviewImage] = useState<string | null>();

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target?.files[0] : null;
    if (!file || !file.type.match("image.*") || !event?.target?.files) {
      return;
    }
    let newImageFiles: TUploadTourImage[] = [];

    console.log("FILES", event.target.files);

    for (const file of event.target.files) {
      if (images.length + newImageFiles.length < maxImages) {
        const img: TUploadTourImage = {
          state: "new",
          file,
          preview: URL.createObjectURL(file),
        };
        newImageFiles.push(img);
      }
    }

    handleChange([...images, ...newImageFiles], CREATE_TOUR_DATA.images);
  };

  const handlePreview = (imgUrl: string) => {
    setPreviewImage(imgUrl);
  };

  const handleDelete = (index: number) => {
    const newImageFiles = [
      ...images.slice(0, index),
      ...images.slice(index + 1),
    ];
    handleChange(newImageFiles, CREATE_TOUR_DATA.images);
  };

  const handleCloseModal = () => {
    setPreviewImage(null);
  };

  return (
    <ImagesInputContainer>
      {images.map((imgFile, index) => (
        <ImageElement>
          <img
            alt="preview content"
            src={imgFile.state === "new" ? imgFile.preview : imgFile.url}
            style={{ width: "20rem" }}
          />
          <ImageElementHover>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.empty}
              type="button"
              onClick={() => {
                handlePreview(
                  imgFile.state === "new" ? imgFile.preview : imgFile.url
                );
              }}>
              <EyeIcon />
            </Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.empty}
              type="button"
              onClick={() => {
                handleDelete(index);
              }}>
              <TrashIcon />
            </Button>
          </ImageElementHover>
        </ImageElement>
      ))}
      {images.length < maxImages && (
        <InputWrapper>
          <ImagesInputElement
            type="file"
            id="files"
            multiple
            accept="image/*"
            name="files[]"
            onChange={(e) => handleChangeImages(e)}
            draggable={true}
          />
          <ImagesInputText>
            <PlusIcon />
            <UploadText>Upload</UploadText>
          </ImagesInputText>
        </InputWrapper>
      )}
      <Modal
        handleClose={handleCloseModal}
        open={Boolean(previewImage)}
        title={"Tour image preview"}>
        <img alt="preview content" src={previewImage || ""} />
      </Modal>
    </ImagesInputContainer>
  );
};

export default ImagesInput;
