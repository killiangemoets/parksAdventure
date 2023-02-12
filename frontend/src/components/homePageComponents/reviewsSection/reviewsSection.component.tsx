import { useEffect, useState } from "react";
import { GreenOpacity } from "../../../routes/home/home.style";
import Carousel from "../../UIComponents/carousel/carousel.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import TopReview from "../topReview/topReview.component";
import {
  ReviewsSecContainer,
  ReviewsSecContent,
  ReviewsSecPicture,
  ReviewsSecWrapper,
} from "./reviewsSection.style";

export type Review = {
  title: string;
  description: string;
  name: string;
  profilePicture: string;
  rate: number;
};

const reviewsData: Review[] = [
  {
    title: "Banff National Park Experience - 3 days",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut at corporiaut debitis tempore? Nam quod voluptatibus, eos obcaecati eum qua autem. Ullam dignissimos, quia repudiandae impedit quas harum maiores.eum quas autem. Ullam dignissimos, quia repudiandae impedit quas harummaiores.",
    name: "Lucas Scott",
    profilePicture: "images/user.jpg",
    rate: 4,
  },
  {
    title: "Rocky mountains- 7 days",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut at corporiaut debitis tempore? Nam quod voluptatibus, eos obcaecati eum qua autem. Ullam dignissimos, quia repudiandae impedit quas harum maiores.eum quas autem. Ullam dignissimos, quia repudiandae impedit quas harummaiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatibus quia hic ipsam fugiat nemo consectetur error, quo molestias aut placeat voluptatem labore? Maiores eligendi atque omnis est ab quam.",
    name: "Nathan Scott",
    profilePicture: "images/user.jpg",
    rate: 4,
  },
  {
    title: "Great Smoky Mountains National Park - 4 days",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut at corporiaut debitis tempore? Nam quod voluptatibus!.",
    name: "Tom Saywer",
    profilePicture: "images/user.jpg",
    rate: 4,
  },
  {
    title: "Jasper Nation Park - 2 days",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut at corporiaut debitis tempore? Nam quod voluptatibus, eos obcaecati eum qua autem!.",
    name: "David Goggins",
    profilePicture: "images/user.jpg",
    rate: 4,
  },
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const reviewsEl = reviewsData.map((reviewData) => (
      <TopReview review={reviewData} />
    ));
    setReviews(reviewsEl);
  }, []);

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
          <Carousel elements={reviews} />
        </ReviewsSecContent>
      </ReviewsSecWrapper>
    </ReviewsSecContainer>
  );
};

export default ReviewsSection;
