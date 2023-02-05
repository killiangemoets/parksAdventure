import { useRef } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import CheckBoxes from "../../UIComponents/checkBoxes/checkBoxes.component";
import SliderInput from "../../UIComponents/sliderInput/sliderInput.component";
import SliderSteps from "../../UIComponents/sliderSteps/sliderSteps.component";
import {
  ButtonSection,
  CloseIcon,
  Filter,
  FilterCheckBoxes,
  FilterElement,
  Filters,
  FiltersPopupContainer,
  FiltersPopupTitle,
  FiltersPopupTitleSection,
  FilterTitle,
  Overlay,
} from "./filtersPopup.style";

const FiltersPopup = ({ handleOpenFilters }) => {
  const popupRef = useRef(null);

  const handleClickOnOverlay = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target))
      handleOpenFilters(false);
  };

  return (
    <Overlay onClick={handleClickOnOverlay}>
      <FiltersPopupContainer ref={popupRef}>
        <FiltersPopupTitleSection>
          <FiltersPopupTitle>Filters</FiltersPopupTitle>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.empty}
            onClick={() => handleOpenFilters(false)}
          >
            <CloseIcon />
          </Button>
        </FiltersPopupTitleSection>
        <Filters>
          <FilterElement>
            <FilterTitle>Price</FilterTitle>
            <Filter>
              <SliderInput min={0} max={200} />
            </Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Duration</FilterTitle>
            <Filter>
              <SliderInput min={0} max={5} />
            </Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Group Size</FilterTitle>
            <Filter>
              <SliderInput min={0} max={50} />
            </Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Difficulty</FilterTitle>
            <Filter>
              <SliderSteps steps={["Family", "Medium", "Hard", "Expert"]} />
            </Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Category</FilterTitle>
            <FilterCheckBoxes>
              <CheckBoxes
                options={[
                  "Mountain",
                  "Desert",
                  "Snow",
                  "Cities",
                  "Sea",
                  "Lakes",
                ]}
              />
            </FilterCheckBoxes>
          </FilterElement>
        </Filters>
        <ButtonSection>
          <Button onClick={() => handleOpenFilters(false)}>
            Show 23 results
          </Button>
        </ButtonSection>
      </FiltersPopupContainer>
    </Overlay>
  );
};

export default FiltersPopup;
