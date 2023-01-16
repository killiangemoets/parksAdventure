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

const FiltersPopup = () => {
  return (
    <Overlay>
      <FiltersPopupContainer>
        <FiltersPopupTitleSection>
          <FiltersPopupTitle>Filters</FiltersPopupTitle>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>
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
          <Button>Show 23 results</Button>
        </ButtonSection>
      </FiltersPopupContainer>
    </Overlay>
  );
};

export default FiltersPopup;
