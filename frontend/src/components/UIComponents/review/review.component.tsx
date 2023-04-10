import StarsRating from "../starsRating/starsRating.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../profilePicture/profilePicture.component";
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

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FC } from "react";
import niceDate from "../../../utils/formatting/formatDates";

type ReviewerProps = {
  userImg?: string;
  userName: string;
};

const Reviewer: FC<ReviewerProps> = ({ userImg, userName }) => {
  return (
    <ReviewerContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
        pictureUrl={userImg}
      />
      <ReviewerName>{userName}</ReviewerName>
    </ReviewerContainer>
  );
};

type ReviewProps = {
  hideEditButtons?: boolean;
  date: Date;
  review: string;
  rating: number;
  userImg?: string;
  userName: string;
};

const Review: FC<ReviewProps> = ({
  hideEditButtons = true,
  date,
  review,
  rating,
  userImg,
  userName,
}) => {
  return (
    <ReviewContainer>
      <ReviewInfos>
        <Reviewer userImg={userImg} userName={userName} />
        <ReviewDate>{niceDate(date)}</ReviewDate>
      </ReviewInfos>
      <ReviewContent>
        <StarsRating hiddenValue={true} rating={rating} />
        <ReviewText>{review}</ReviewText>
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
