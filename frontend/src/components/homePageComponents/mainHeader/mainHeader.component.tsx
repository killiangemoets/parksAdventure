import { useEffect, useState } from "react";
import { GreenOpacity } from "../../../routes/home/home.style";
import {
  MainHeaderContainer,
  MainHeaderContentContainer,
  MainHeaderLogoContainer,
  MainHeaderText,
} from "./mainHeader.style";

import HeaderCarousel from "../mainCarousel/mainCarousel.component";
import headerImg1 from "../../../assets/images/mainHeader/header1.webp";
import headerImg2 from "../../../assets/images/mainHeader/header2.webp";
import headerImg3 from "../../../assets/images/mainHeader/header3.webp";
import headerImg4 from "../../../assets/images/mainHeader/header4.webp";
import headerImg5 from "../../../assets/images/mainHeader/header5.webp";
import headerImg6 from "../../../assets/images/mainHeader/header6.webp";
import headerImg7 from "../../../assets/images/mainHeader/header7.webp";
import headerImg8 from "../../../assets/images/mainHeader/header8.webp";
import headerImg9 from "../../../assets/images/mainHeader/header9.webp";
import headerImg10 from "../../../assets/images/mainHeader/header10.webp";

const bgImagesUrl = [
  headerImg1,
  headerImg2,
  headerImg3,
  headerImg4,
  headerImg5,
  headerImg6,
  headerImg7,
  headerImg9,
  headerImg8,
  headerImg10,
];

const MainHeader = () => {
  const [bgImages, setBgImages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const bgImagesEl = bgImagesUrl.map((backgroundImage, i) => (
      <MainHeaderContainer
        key={i}
        className="bg-img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}>
        <GreenOpacity>
          <MainHeaderContentContainer>
            <MainHeaderLogoContainer className="logo" />
            <MainHeaderText className="text">Explore Our Nature</MainHeaderText>
          </MainHeaderContentContainer>
        </GreenOpacity>
      </MainHeaderContainer>
    ));
    setBgImages(bgImagesEl);
  }, []);

  return <HeaderCarousel elements={bgImages} />;
};

export default MainHeader;
