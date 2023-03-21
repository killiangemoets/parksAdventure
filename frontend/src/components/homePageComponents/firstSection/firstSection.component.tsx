import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  BackText,
  BackTitle,
  FirstSecContainer,
  FirstSecElement,
  FirstSecElementBack,
  FirstSecElementFront,
  FirstSecElementInner,
  FirstSectionContentWrapper,
  FrontTitle,
} from "./firstSection.style";

import rangerImg from "../../../assets/aboutCards/ranger.jpg";
import viewImg from "../../../assets/aboutCards/views.jpg";
import mapImg from "../../../assets/aboutCards/fullyPlan.jpg";
import { GreenOpacity } from "../../../routes/home/home.style";
import { FC } from "react";

export type FlipCardProps = {
  title: string;
  imageUrl: string;
  text: string;
  highlight: string;
};

export const FlipCard: FC<FlipCardProps> = ({
  title,
  imageUrl,
  text,
  highlight,
}) => {
  const cutIndex1 = text.indexOf(highlight);
  const cutIndex2 = cutIndex1 + highlight.length;
  const textWithHighlight = (
    <>
      {text.slice(0, cutIndex1)}
      <span>{text.slice(cutIndex1, cutIndex2)}</span>
      {text.slice(cutIndex2)}
    </>
  );
  return (
    <FirstSecElement>
      <FirstSecElementInner>
        <FirstSecElementFront
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <GreenOpacity>
            <FrontTitle>{title}</FrontTitle>
          </GreenOpacity>
        </FirstSecElementFront>
        <FirstSecElementBack>
          <BackTitle>{title}</BackTitle>
          <BackText>{textWithHighlight}</BackText>
        </FirstSecElementBack>
      </FirstSecElementInner>
    </FirstSecElement>
  );
};

const elements: FlipCardProps[] = [
  {
    title: "Certified Tour Rangers",
    imageUrl: rangerImg,
    text: "All our tours are insured by the security of our certified rangers.",
    highlight: "our certified rangers",
  },
  {
    title: "Exceptional Views",
    imageUrl: viewImg,
    text: "All of our tours provide you with breathtaking views.",
    highlight: "breathtaking views",
  },
  {
    title: "Fully Planned Tours",
    imageUrl: mapImg,
    text: "All our tours are 100% planned and the instructions are easy to follow.",
    highlight: "instructions are easy to follow",
  },
];

const FirstSection = () => {
  return (
    <FirstSecContainer>
      <Title titleType={TITLE_TYPE_CLASSES.homeSection}>
        Unique Hiking Tours
      </Title>
      <FirstSectionContentWrapper>
        {elements.map((el, i) => (
          <FlipCard
            key={i}
            title={el.title}
            imageUrl={el.imageUrl}
            text={el.text}
            highlight={el.highlight}
          />
        ))}
      </FirstSectionContentWrapper>
    </FirstSecContainer>
  );
};

export default FirstSection;
