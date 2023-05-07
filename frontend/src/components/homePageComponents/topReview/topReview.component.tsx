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
import { useNavigate } from "react-router-dom";
import { TopReviewData } from "../../../types/review";

export type TopReviewProps = {
  review: TopReviewData;
};

const TopReview: FC<TopReviewProps> = ({ review }) => {
  const navigate = useNavigate();
  const handleClickTitle = () => {
    navigate(`/tour/${review.slug}`);
  };
  return (
    <TopReviewContainer onClick={handleClickTitle}>
      <ReviewTitle>{review.title}</ReviewTitle>
      <StarsRating hiddenValue={true} rating={review.rate} />
      <ReviewDescription>{review.description}</ReviewDescription>
      <ReviewUser>
        <ProfilePicture pictureUrl={review.profilePicture} />
        <UserName>{review.name}</UserName>
      </ReviewUser>
    </TopReviewContainer>
  );
};

export default TopReview;
