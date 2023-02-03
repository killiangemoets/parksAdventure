import { useEffect, useState } from "react";
import useTimer from "../../../hooks/timer";
import { GreenOpacity } from "../../../routes/home/home.style";
import {
  MainHeaderContainer,
  MainHeaderContentContainer,
  MainHeaderLogoContainer,
  MainHeaderText,
} from "./mainHeader.style";

import mainHeaderBackground1 from "../../../assets/hikingImg/clemence-bergougnoux-zLIrNgNzPYs-unsplash.jpg";
import mainHeaderBackground2 from "../../../assets/hikingImg/nika-tchokhonelidze-Ms_p0I5DQSM-unsplash.jpg";
import mainHeaderBackground3 from "../../../assets/hikingImg/carlos-0yuIA1K7LyA-unsplash.jpg";
import mainHeaderBackground4 from "../../../assets/hikingImg/zach-betten-KYTT8L5JLDs-unsplash.jpg";
import mainHeaderBackground5 from "../../../assets/hikingImg/nathan-dumlao-pLoMDKtl-JY-unsplash.jpg";

import $ from "jquery";

const MainHeader = () => {
  const backgroundImages = [
    mainHeaderBackground1,
    mainHeaderBackground2,
    mainHeaderBackground3,
    mainHeaderBackground4,
    mainHeaderBackground5,
  ];

  const currentBgNumber = useTimer({
    max: backgroundImages.length,
    time: 8,
  });

  const TextEl = $(".text");
  const LogoEl = $(".logo");
  const BgImgEl = $(".bg-img");

  useEffect(() => {
    // const image = new Image();
    // image.src = backgroundImages[currentBgNumber - 1];

    // image.addEventListener("load", () => {
    // BgImgEl.animate({ opacity: "1" }, 0);
    // BgImgEl.animate({ opacity: "0" }, 300);
    TextEl.animate({ opacity: "1" }, 0);
    TextEl.animate({ opacity: "0" }, 300);
    LogoEl.animate({ opacity: "1" }, 0);
    LogoEl.animate({ opacity: "0" }, 300, function () {
      BgImgEl.css(
        "background-image",
        `url(${backgroundImages[currentBgNumber - 1]})`
      );
    });
    TextEl.animate(
      { opacity: "0", paddingBottom: "-4.8rem", paddingTop: "4.8rem" },
      0
    );
    TextEl.animate(
      { opacity: "1", paddingBottom: "0rem", paddingTop: "0rem" },
      800
    );
    LogoEl.animate({ opacity: "0", paddingBottom: "-2.4rem" }, 0);
    LogoEl.animate({ opacity: "1", paddingBottom: "0rem" }, 300);
    // document.querySelector(".text").style.animation = "none";
    // void document.querySelector(".text").offsetWidth;
    // document.querySelector(".text").style.animation = "my-animation 3s";
    // });
  }, [currentBgNumber]);

  return (
    <MainHeaderContainer className="bg-img">
      <GreenOpacity>
        <MainHeaderContentContainer>
          <MainHeaderLogoContainer className="logo" />
          <MainHeaderText className="text">Explort Our Nature</MainHeaderText>
        </MainHeaderContentContainer>
      </GreenOpacity>
    </MainHeaderContainer>
  );
};

export default MainHeader;
