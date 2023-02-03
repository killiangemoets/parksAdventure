import { GreenOpacity } from "../../../routes/home/home.style";
import ProfilePicture from "../../UIComponents/profilePicture/profilePicture.component";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  CurrentDot,
  Dot,
  Review,
  ReviewDescription,
  ReviewsCarousel,
  ReviewsSecContainer,
  ReviewsSecContent,
  ReviewsSecPicture,
  ReviewsSecWrapper,
  ReviewTitle,
  ReviewUser,
  UserName,
} from "./reviewsSection.style";

const ReviewsSection = () => {
  return (
    <ReviewsSecContainer>
      <ReviewsSecWrapper>
        <ReviewsSecPicture>
          <GreenOpacity />
        </ReviewsSecPicture>
        <ReviewsSecContent>
          <Title titleType={TITLE_TYPE_CLASSES.homeSection}>
            Our Top Reviews
          </Title>
          <Review>
            <ReviewTitle>Banff National Park Experience - 3 days</ReviewTitle>
            <StarsRating hiddenValue={true} />
            <ReviewDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut at
              corporis aut debitis tempore? Nam quod voluptatibus, eos obcaecati
              eum quas autem. Ullam dignissimos, quia repudiandae impedit quas
              harum maiores. eum quas autem. Ullam dignissimos, quia repudiandae
              impedit quas harum maiores.
            </ReviewDescription>
            <ReviewUser>
              <ProfilePicture pictureUrl={"images/user.jpg"} />
              <UserName>Lucas Scott</UserName>
            </ReviewUser>
          </Review>
          <ReviewsCarousel>
            <Dot></Dot>
            <CurrentDot></CurrentDot>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
          </ReviewsCarousel>
        </ReviewsSecContent>
      </ReviewsSecWrapper>
    </ReviewsSecContainer>
  );
};

export default ReviewsSection;
