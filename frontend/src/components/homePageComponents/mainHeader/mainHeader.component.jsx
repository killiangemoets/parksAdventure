import { useEffect, useState } from "react";
import { GreenOpacity } from "../../../routes/home/home.style";
import {
  MainHeaderContainer,
  MainHeaderContentContainer,
  MainHeaderLogoContainer,
  MainHeaderText,
} from "./mainHeader.style";

// import mainHeaderBackground1 from "../../../assets/hikingImg/clemence-bergougnoux-zLIrNgNzPYs-unsplash.jpg";
// import mainHeaderBackground2 from "../../../assets/hikingImg/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg";
// import mainHeaderBackground3 from "../../../assets/hikingImg/carlos-0yuIA1K7LyA-unsplash.jpg";
// import mainHeaderBackground4 from "../../../assets/hikingImg/zach-betten-KYTT8L5JLDs-unsplash.jpg";
// import mainHeaderBackground5 from "../../../assets/hikingImg/nathan-dumlao-pLoMDKtl-JY-unsplash.jpg";

import $ from "jquery";
import HeaderCarousel from "../mainCarousel/mainCarousel.component";

const bgImagesUrl = [
  "images/hikingImg/clemence-bergougnoux-zLIrNgNzPYs-unsplash.jpg",
  "images/hikingImg/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg",
  "images/hikingImg/carlos-0yuIA1K7LyA-unsplash.jpg",
  "images/hikingImg/zach-betten-KYTT8L5JLDs-unsplash.jpg",
  "images/hikingImg/nathan-dumlao-pLoMDKtl-JY-unsplash.jpg",
];

// const backgroundImages = [
//   mainHeaderBackground1,
//   mainHeaderBackground2,
//   mainHeaderBackground3,
//   mainHeaderBackground4,
//   mainHeaderBackground5,
// ];

const MainHeader = () => {
  const [bgImages, setBgImages] = useState([]);

  const textAnimation = () => {
    const TextEl = $(".text");
    const LogoEl = $(".logo");
    TextEl.animate(
      { opacity: "0", marginBottom: "-4.8rem", marginTop: "4.8rem" },
      0
    );
    TextEl.animate(
      { opacity: "1", marginBottom: "0rem", marginTop: "0rem" },
      800
    );
    LogoEl.animate({ opacity: "0", marginBottom: "-2.4rem" }, 0);
    LogoEl.animate({ opacity: "1", marginBottom: "0rem" }, 300);
  };

  useEffect(() => {
    const bgImagesEl = bgImagesUrl.map((backgroundImage) => (
      <MainHeaderContainer
        className="bg-img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
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
