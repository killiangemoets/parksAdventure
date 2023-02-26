import { FC, useState } from "react";
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
} from "./filtersModalstyle";

export type FiltersModalProps = {
  handleCloseFilters: ModalProps["handleClose"];
  filtersOpen: ModalProps["open"];
};

const FiltersModal: FC<FiltersModalProps> = ({
  handleCloseFilters,
  filtersOpen,
}) => {
  const categories: Info[] = [
    { value: "Mountain", id: "mountain" },
    { value: "Desert", id: "desert" },
    { value: "Snow", id: "snow" },
    { value: "Cities", id: "cities" },
    { value: "Sea", id: "sea" },
    { value: "Lakes", id: "lakes" },
  ];

  const [selectedCategories, setSelectedCategories] =
    useState<Info[]>(categories);

  const handleCategoriesChange = (selectedCategories: Info[]) => {
    setSelectedCategories(selectedCategories);
  };

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
              options={categories}
              allowSelectAll={true}
              selection={selectedCategories}
              handler={handleCategoriesChange}
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

export default FiltersModal;
