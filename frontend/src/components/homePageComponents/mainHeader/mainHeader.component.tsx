import { useEffect, useState } from "react";
import { GreenOpacity } from "../../../routes/home/home.style";
import {
  MainHeaderContainer,
  MainHeaderContentContainer,
  MainHeaderLogoContainer,
  MainHeaderText,
} from "./mainHeader.style";

import HeaderCarousel from "../mainCarousel/mainCarousel.component";

const bgImagesUrl = [
  "images/hikingImg/clemence-bergougnoux-zLIrNgNzPYs-unsplash.jpg",
  "images/hikingImg/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg",
  "images/hikingImg/carlos-0yuIA1K7LyA-unsplash.jpg",
  "images/hikingImg/zach-betten-KYTT8L5JLDs-unsplash.jpg",
  "images/hikingImg/nathan-dumlao-pLoMDKtl-JY-unsplash.jpg",
];

const MainHeader = () => {
  const [bgImages, setBgImages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const bgImagesEl = bgImagesUrl.map((backgroundImage) => (
      <MainHeaderContainer
        className="bg-img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}>
        <GreenOpacity>
          <MainHeaderContentContainer>
            <MainHeaderLogoContainer className="logo" />
            <MainHeaderText className="text">Explort Our Nature</MainHeaderText>
          </MainHeaderContentContainer>
        </GreenOpacity>
      </MainHeaderContainer>
    ));
    setBgImages(bgImagesEl);
  }, []);

  return <HeaderCarousel elements={bgImages} />;
};

export default MainHeader;
