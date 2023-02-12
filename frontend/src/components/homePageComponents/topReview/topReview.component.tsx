import { FC } from "react";
import ProfilePicture from "../../UIComponents/profilePicture/profilePicture.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import {
  ReviewDescription,
  ReviewTitle,
  ReviewUser,
  TopReviewContainer,
  UserName,
} from "./topReview.style";
import { Review } from "../reviewsSection/reviewsSection.component";

export type TopReviewProps = {
  review: Review;
};

const TopReview: FC<TopReviewProps> = ({ review }) => {
  return (
    <TopReviewContainer>
      <ReviewTitle>{review.title}</ReviewTitle>
      <StarsRating hiddenValue={true} />
      <ReviewDescription>{review.description}</ReviewDescription>
      <ReviewUser>
        <ProfilePicture pictureUrl={review.profilePicture} />
        <UserName>{review.name}</UserName>
      </ReviewUser>
    </TopReviewContainer>
  );
};

export default TopReview;
