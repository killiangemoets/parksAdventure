import FirstSection from "../../components/homePageComponents/firstSection/firstSection.component";
import MainHeader from "../../components/homePageComponents/mainHeader/mainHeader.component";
import ReviewsSection from "../../components/homePageComponents/reviewsSection/reviewsSection.component";
import SecondSection from "../../components/homePageComponents/secondSection/secondSection.component";
import ThirdSection from "../../components/thirdSection/thirdSection.component";
import { HomeComponentContainer } from "./home.style";

const Home = () => {
  return (
    <HomeComponentContainer>
      <MainHeader />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <ReviewsSection />
    </HomeComponentContainer>
  );
};

export default Home;
