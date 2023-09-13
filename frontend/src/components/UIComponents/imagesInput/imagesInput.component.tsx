import { ChangeEvent, FC, useState } from "react";
import {
  EyeIcon,
  ImageButtons,
  ImagesInputContainer,
  ImagesInputElement,
  ImagesInputText,
  InputWrapper,
  LargeTourImage,
  PlusIcon,
  TourImage,
  TrashIcon,
  UploadText,
} from "./imagesInput.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import Modal from "../modal/modal.component";
import { CREATE_TOUR_DATA, TUploadTourImage } from "../../../types/tour";

import SortableDragAndDrop from "./sortableDragAndDrop";
import { arrayMove } from "@dnd-kit/sortable";
import Alert from "../alert/alert.component";

const maxImages = 20;

export type ImagesInputProps = {
  images: TUploadTourImage[];
  handleChange: (images: TUploadTourImage[], name: string) => void;
};

const ImagesInput: FC<ImagesInputProps> = ({ images, handleChange }) => {
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [alertMessage, setAlertMessage] = useState<string | undefined>(
    undefined
  );

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target?.files[0] : null;
    if (!file || !file.type.match("image.*") || !event?.target?.files) {
      return;
    }
    let newImageFiles: TUploadTourImage[] = [];

    for (const file of event.target.files) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setAlertMessage(
          "An image size is too large. The maximum size is 10 MB."
        );
        setTimeout(function () {
          setAlertMessage(undefined);
        }, 4000);
      } else if (images.length + newImageFiles.length < maxImages) {
        const img: TUploadTourImage = {
          state: "new",
          file,
          preview: URL.createObjectURL(file),
          id: Math.trunc(Math.random() * 1000).toString(),
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active !== over) {
      const activeIndex = images.findIndex((img) => img.id === active.id);
      const overIndex = images.findIndex((img) => img.id === over.id);
      handleChange(
        arrayMove(images, activeIndex, overIndex),
        CREATE_TOUR_DATA.images
      );
    }
  };

  return (
    <>
      <ImagesInputContainer>
        <SortableDragAndDrop
          handleDragEnd={handleDragEnd}
          items={images.map((imgFile, index) => {
            return {
              id: imgFile.id,
              first: index === 0,
              content:
                index > 0 ? (
                  <TourImage
                    alt="preview content"
                    src={
                      imgFile.state === "new" ? imgFile.preview : imgFile.url
                    }
                  />
                ) : (
                  <LargeTourImage
                    alt="preview content"
                    src={
                      imgFile.state === "new" ? imgFile.preview : imgFile.url
                    }
                  />
                ),
              contentHover: (
                <ImageButtons>
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
                </ImageButtons>
              ),
            };
          })}
        />

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
      {alertMessage && <Alert>{alertMessage}</Alert>}
    </>
  );
};

export default ImagesInput;
