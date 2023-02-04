import { useRef } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import {
  ButtonSection,
  CloseIcon,
  Filter,
  FilterElement,
  Filters,
  FiltersPopupContainer,
  FiltersPopupTitle,
  FiltersPopupTitleSection,
  FilterTitle,
  Overlay,
  SelectFilter,
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
            <Filter></Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Duration</FilterTitle>
            <Filter></Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Group Size</FilterTitle>
            <Filter></Filter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Difficulty</FilterTitle>
            <SelectFilter></SelectFilter>
          </FilterElement>
          <FilterElement>
            <FilterTitle>Category</FilterTitle>
            <SelectFilter></SelectFilter>
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
