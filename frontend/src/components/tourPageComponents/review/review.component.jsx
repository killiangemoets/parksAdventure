import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import ProfilePicture from "../../UIComponents/profilePicture/profilePicture.component";
import {
  LeftInfos,
  ReviewContainer,
  ReviewDate,
  ReviewerContainer,
  ReviewerName,
  ReviewInfos,
  ReviewText,
} from "./review.style";

const Reviewer = () => {
  return (
    <ReviewerContainer>
      <ProfilePicture pictureUrl={"images/user.jpg"} />
      <ReviewerName>Jack Harlow</ReviewerName>
    </ReviewerContainer>
  );
};

const Review = () => {
  return (
    <ReviewContainer>
      <ReviewInfos>
        <LeftInfos>
          <Reviewer />
          <StarsRating hiddenValue={true} />
        </LeftInfos>
        <ReviewDate>November 14, 2022</ReviewDate>
      </ReviewInfos>
      <ReviewText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ab
        harum labore culpa porro minus sunt at id voluptate perspiciatis, quo
        optio non esse a fugiat quae, aut commodi quisquam. Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Aliquid veritatis pariatur rerum
        debitis laboriosam, voluptatem velit dolore dolorem veniam, magni
        architecto quos unde ea totam incidunt placeat expedita eius libero! :)
      </ReviewText>
    </ReviewContainer>
  );
};
export default Review;
