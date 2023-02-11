import Button from "../../UIComponents/button/button.component";
import CheckBoxes from "../../UIComponents/checkBoxes/checkBoxes.component";
import Modal from "../../UIComponents/modal/modal.component";
import SliderInput from "../../UIComponents/sliderInput/sliderInput.component";
import SliderSteps from "../../UIComponents/sliderSteps/sliderSteps.component";
import {
  ButtonSection,
  Filter,
  FilterCheckBoxes,
  FilterElement,
  Filters,
  FilterTitle,
} from "./filtersPopup.style";

const FiltersPopup = ({ handleOpenFilters }) => {
  return (
    <Modal title={"Filters"} handleOpen={handleOpenFilters}>
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
              options={["Mountain", "Desert", "Snow", "Cities", "Sea", "Lakes"]}
            />
          </FilterCheckBoxes>
        </FilterElement>
      </Filters>
      <ButtonSection>
        <Button onClick={() => handleOpenFilters(false)}>
          Show 23 results
        </Button>
      </ButtonSection>
    </Modal>
  );
};

export default FiltersPopup;
