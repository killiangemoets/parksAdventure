import { FC } from "react";
import {
  AddTourImagesContainer,
  AddTourImagesTitle,
  AddTourImagesWrapper,
  ErrorMessage,
} from "./addTourImages.style";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../UIComponents/title/title.component";
import ImagesInput from "../../../UIComponents/imagesInput/imagesInput.component";
import { TUploadTourImage } from "../../../../types/tour";

export type AddTourImagesProps = {
  images: TUploadTourImage[];
  handleChange: (images: TUploadTourImage[], name: string) => void;
  error: boolean;
};

const AddTourImages: FC<AddTourImagesProps> = ({
  images,
  handleChange,
  error,
}) => {
  return (
    <AddTourImagesContainer>
      <AddTourImagesWrapper>
        <AddTourImagesTitle>
          <Title titleType={TITLE_TYPE_CLASSES.section}>Tour images</Title>
        </AddTourImagesTitle>
        <ImagesInput images={images} handleChange={handleChange} />
        <ErrorMessage>
          {error ? "A tour must have at least 4 images" : ""}
        </ErrorMessage>
      </AddTourImagesWrapper>
    </AddTourImagesContainer>
  );
};

export default AddTourImages;
