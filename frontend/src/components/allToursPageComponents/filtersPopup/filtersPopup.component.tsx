import { FC } from "react";
import Button from "../../UIComponents/button/button.component";
import CheckBoxes from "../../UIComponents/checkBoxes/checkBoxes.component";
import Modal, { ModalProps } from "../../UIComponents/modal/modal.component";
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

export type FiltersPopupProps = {
  handleCloseFilters: ModalProps["handleClose"];
  filtersOpen: ModalProps["open"];
};

const FiltersPopup: FC<FiltersPopupProps> = ({
  handleCloseFilters,
  filtersOpen,
}) => {
  return (
    <Modal
      title={"Filters"}
      handleClose={handleCloseFilters}
      open={filtersOpen}
    >
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
        <Button onClick={() => handleCloseFilters()}>Show 23 results</Button>
      </ButtonSection>
    </Modal>
  );
};

export default FiltersPopup;
