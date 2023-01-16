import { GreenOpacity } from "../../../routes/home/home.style";
import StarsRating from "../../UIComponents/starsRating/starsRating.component";
import {
  CurrentDot,
  Dot,
  Review,
  ReviewDescription,
  ReviewsCarousel,
  ReviewsSecContainer,
  ReviewsSecContent,
  ReviewsSecPicture,
  ReviewsSecTitle,
  ReviewsSecWrapper,
  ReviewTitle,
  ReviewUser,
  UserName,
  UserPicture,
} from "./reviewsSection.style";

const ReviewsSection = () => {
  return (
    <ReviewsSecContainer>
      <ReviewsSecWrapper>
        <ReviewsSecPicture>
          <GreenOpacity />
        </ReviewsSecPicture>
        <ReviewsSecContent>
          <ReviewsSecTitle>Our Top Reviews</ReviewsSecTitle>
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
              <UserPicture></UserPicture>
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
