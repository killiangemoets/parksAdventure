import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  EditButtons,
  ReviewContainer,
  ReviewContent,
  ReviewDate,
  ReviewerContainer,
  ReviewerName,
  ReviewInfos,
  ReviewText,
} from "./review.style";

import UserImg from "../../../assets/user.jpg";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import { FC } from "react";

const Reviewer = () => {
  return (
    <ReviewerContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
        pictureUrl={UserImg}
      />
      <ReviewerName>Jack Harlow</ReviewerName>
    </ReviewerContainer>
  );
};

type ReviewProps = {
  hideEditButtons?: boolean;
};

const Review: FC<ReviewProps> = ({ hideEditButtons = true }) => {
  return (
    <ReviewContainer>
      <ReviewInfos>
        <Reviewer />
        <ReviewDate>November 14, 2022</ReviewDate>
      </ReviewInfos>
      <ReviewContent>
        <StarsRating hiddenValue={true} rating={4.2} numRatings={6} />
        <ReviewText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ab
          harum labore culpa porro minus sunt at id voluptate perspiciatis, quo
          optio non esse a fugiat quae, aut commodi quisquam. Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Aliquid veritatis pariatur
          rerum debitis laboriosam, voluptatem velit dolore dolorem veniam,
          magni architecto quos unde ea totam incidunt placeat expedita eius
          libero! :)
        </ReviewText>
      </ReviewContent>
      {!hideEditButtons && (
        <EditButtons>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>Edit</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>Delete</Button>
        </EditButtons>
      )}
    </ReviewContainer>
  );
};
export default Review;
