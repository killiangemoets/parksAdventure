import {
  ElementIconContainer,
  ElementTitle,
  SecondSecContainer,
  SecondSecContainerInside,
  SecondSecElement,
  SecondSecElementLink,
  SecondSecMainTitle,
  SecondSecSecondTitle,
  SecondSectionContentWrapper,
  SecondSecTitlesContainer,
} from "./secondSection.style";

const SecondSection = () => {
  return (
    <SecondSecContainer>
      <SecondSecContainerInside>
        <SecondSecTitlesContainer>
          <SecondSecMainTitle>Choose Tour</SecondSecMainTitle>
          <SecondSecSecondTitle>
            Find your next hiking adventure and make it memorable
          </SecondSecSecondTitle>
        </SecondSecTitlesContainer>
        <SecondSectionContentWrapper>
          <SecondSecElementLink>
            <SecondSecElement>
              <ElementIconContainer>
                <img src="images/familyTours.png" alt="Family tours icon" />
              </ElementIconContainer>
              <ElementTitle>Family Tours</ElementTitle>
            </SecondSecElement>
          </SecondSecElementLink>
          <SecondSecElementLink>
            <SecondSecElement>
              <ElementIconContainer>
                <img src="images/advancedTours.png" alt="Advanced tours icon" />
              </ElementIconContainer>
              <ElementTitle>Advanced Tours</ElementTitle>
            </SecondSecElement>
          </SecondSecElementLink>
          <SecondSecElementLink>
            <SecondSecElement>
              <ElementIconContainer>
                <img src="images/mountainTours.png" alt="Mountain tours icon" />
              </ElementIconContainer>
              <ElementTitle>Mountain Tours</ElementTitle>
            </SecondSecElement>
          </SecondSecElementLink>
          <SecondSecElementLink>
            <SecondSecElement>
              <ElementIconContainer>
                <img src="images/desertTours.png" alt="Desert tours icon" />
              </ElementIconContainer>
              <ElementTitle>Desert Tours</ElementTitle>
            </SecondSecElement>
          </SecondSecElementLink>
          <SecondSecElementLink>
            <SecondSecElement>
              <ElementIconContainer>
                <img src="images/longTours.png" alt="Long tours icon" />
              </ElementIconContainer>
              <ElementTitle>10Days+ Tours</ElementTitle>
            </SecondSecElement>
          </SecondSecElementLink>
        </SecondSectionContentWrapper>
      </SecondSecContainerInside>
    </SecondSecContainer>
  );
};

export default SecondSection;
