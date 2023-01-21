import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import ProfilePicture, {
  PROFILE_PICTURE_TYPE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  ReviewContainer,
  ReviewContent,
  ReviewDate,
  ReviewerContainer,
  ReviewerName,
  ReviewInfos,
  ReviewText,
} from "./review.style";

const Reviewer = () => {
  return (
    <ReviewerContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_TYPE_CLASSES.small}
        pictureUrl={"images/user.jpg"}
      />
      <ReviewerName>Jack Harlow</ReviewerName>
    </ReviewerContainer>
  );
};

const Review = () => {
  return (
    <ReviewContainer>
      <ReviewInfos>
        <Reviewer />
        <ReviewDate>November 14, 2022</ReviewDate>
      </ReviewInfos>
      <ReviewContent>
        <StarsRating hiddenValue={true} />
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
    </ReviewContainer>
  );
};
export default Review;
