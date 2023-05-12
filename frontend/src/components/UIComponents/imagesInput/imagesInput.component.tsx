import { ChangeEvent, useState } from "react";
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

type ImageFiles = {
  preview: string;
};

const maxImages = 20;

const ImagesInput = () => {
  const [currentImageFiles, setCurrentImageFiles] = useState<ImageFiles[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>();

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(
      "FILES",
      event.target.files,
      event.target.files && event.target.files.length
    );

    const file = event.target.files ? event.target?.files[0] : null;
    if (!file || !file.type.match("image.*") || !event?.target?.files) {
      return;
    }
    let newImageFiles: ImageFiles[] = [];
    for (const file of event.target.files) {
      if (currentImageFiles.length + newImageFiles.length < maxImages) {
        const img = Object.assign(file as any, {
          preview: URL.createObjectURL(file as any),
        });
        newImageFiles.push(img);
      }
    }

    console.log(newImageFiles);
    setCurrentImageFiles((currentImageFiles) => [
      ...newImageFiles,
      ...currentImageFiles,
    ]);

    // const reader = new FileReader();
    // reader.onload = (function (_) {
    //   return function (e: ProgressEvent<FileReader>) {
    //     const imgUrl = e.target?.result;
    //     console.log(imgUrl);
    //     setCurrentImageFiles(imgUrl as string);
    //     // imgUrl && onChange(imgUrl as string);
    //   };
    // })(file);
    // reader.readAsDataURL(file);
  };

  const handlePreview = (imgUrl: string) => {
    setPreviewImage(imgUrl);
  };

  const handleDelete = (index: number) => {
    const newImageFiles = [
      ...currentImageFiles.slice(0, index),
      ...currentImageFiles.slice(index + 1),
    ];
    setCurrentImageFiles(newImageFiles);
  };
  const handleCloseModal = () => {
    setPreviewImage(null);
  };

  return (
    <ImagesInputContainer>
      {currentImageFiles.map((imgFile, index) => (
        <ImageElement>
          <img
            alt="preview content"
            src={imgFile.preview}
            style={{ width: "20rem" }}
          />
          <ImageElementHover>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.empty}
              type="button"
              onClick={() => {
                handlePreview(imgFile.preview);
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
      {currentImageFiles.length < maxImages && (
        <InputWrapper>
          <ImagesInputElement
            type="file"
            id="files"
            multiple
            accept="image/*"
            name="files[]"
            // value={currentImageFiles}
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
