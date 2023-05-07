import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  categoriesInfoList,
  difficultiesInfoList,
  FiltersData,
  filtersMinMax,
} from "../../../types/tour";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
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

const defaultFiltersState: FiltersData = {
  price: filtersMinMax.price,
  duration: filtersMinMax.duration,
  groupSize: filtersMinMax.groupSize,
  categories: categoriesInfoList,
  difficulty: difficultiesInfoList,
};

const FiltersModal: FC<FiltersModalProps> = ({
  handleCloseFilters,
  filtersOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FiltersData>(defaultFiltersState);

  useEffect(() => {
    const minPriceParams = searchParams.get("price[gte]");
    const maxPriceParams = searchParams.get("price[lte]");
    const price: [number, number] = [
      minPriceParams && !isNaN(+minPriceParams)
        ? +minPriceParams
        : filtersMinMax.price[0],
      maxPriceParams && !isNaN(+maxPriceParams)
        ? +maxPriceParams
        : filtersMinMax.price[1],
    ];

    const minDurationParams = searchParams.get("duration[gte]");
    const maxDurationParams = searchParams.get("duration[lte]");
    const duration: [number, number] = [
      minDurationParams && !isNaN(+minDurationParams)
        ? +minDurationParams
        : filtersMinMax.duration[0],
      maxDurationParams && !isNaN(+maxDurationParams)
        ? +maxDurationParams
        : filtersMinMax.duration[1],
    ];

    const minGroupSizeParams = searchParams.get("groupSize[gte]");
    const maxGroupSizeParams = searchParams.get("groupSize[lte]");
    const groupSize: [number, number] = [
      minGroupSizeParams && !isNaN(+minGroupSizeParams)
        ? +minGroupSizeParams
        : filtersMinMax.groupSize[0],
      maxGroupSizeParams && !isNaN(+maxGroupSizeParams)
        ? +maxGroupSizeParams
        : filtersMinMax.groupSize[1],
    ];

    const categoriesParams = searchParams.getAll("category");
    let categories: TInfo<string>[] = [];
    categoriesParams.forEach((categoriesParam) => {
      const categoryFound = categoriesInfoList.find(
        (category) => category.id === categoriesParam
      );
      if (categoryFound) categories.push(categoryFound);
    });
    if (!categories.length) categories = categoriesInfoList;

    const difficultyParams = searchParams.getAll("difficulty");
    let difficulty: TInfo<string>[] = [];
    difficultyParams.forEach((difficultyParam) => {
      const difficultyFound = difficultiesInfoList.find(
        (difficulty) => difficulty.id === difficultyParam
      );
      if (difficultyFound) difficulty.push(difficultyFound);
    });
    if (!difficulty.length) difficulty = difficultiesInfoList;

    setFilters({ price, duration, groupSize, categories, difficulty });
  }, [searchParams]);

  const handleChange = (
    value: [number, number] | TInfo<string>[],
    name: string
  ) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleConfirm = () => {
    searchParams.delete("category");
    if (filters.categories.length < categoriesInfoList.length)
      filters.categories.forEach((category) => {
        searchParams.append("category", category.id.toString());
      });

    searchParams.delete("difficulty");
    if (filters.difficulty.length < difficultiesInfoList.length)
      filters.difficulty.forEach((difficulty) => {
        searchParams.append("difficulty", difficulty.id.toString());
      });

    if (filters.price[0] > filtersMinMax.price[0])
      searchParams.set("price[gte]", filters.price[0].toString());
    else searchParams.delete("price[gte]");
    if (filters.price[1] < filtersMinMax.price[1])
      searchParams.set("price[lte]", filters.price[1].toString());
    else searchParams.delete("price[lte]");

    if (filters.duration[0] > filtersMinMax.duration[0])
      searchParams.set("duration[gte]", filters.duration[0].toString());
    else searchParams.delete("duration[gte]");
    if (filters.duration[1] < filtersMinMax.duration[1])
      searchParams.set("duration[lte]", filters.duration[1].toString());
    else searchParams.delete("duration[lte]");

    if (filters.groupSize[0] > filtersMinMax.groupSize[0])
      searchParams.set("groupSize[gte]", filters.groupSize[0].toString());
    else searchParams.delete("groupSize[gte]");
    if (filters.groupSize[1] < filtersMinMax.groupSize[1])
      searchParams.set("groupSize[lte]", filters.groupSize[1].toString());
    else searchParams.delete("groupSize[lte]");

    searchParams.delete("page");
    setSearchParams(searchParams);
    handleCloseFilters();
  };

  const handleReset = () => {
    setFilters(defaultFiltersState);
    searchParams.delete("category");
    searchParams.delete("difficulty");
    searchParams.delete("price[gte]");
    searchParams.delete("price[lte]");
    searchParams.delete("duration[gte]");
    searchParams.delete("duration[lte]");
    searchParams.delete("groupSize[gte]");
    searchParams.delete("groupSize[lte]");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Modal
      title={"Filters"}
      handleClose={handleCloseFilters}
      open={filtersOpen}>
      <Filters>
        <FilterElement>
          <FilterTitle>Price</FilterTitle>
          <Filter>
            <SliderInput
              min={filtersMinMax.price[0]}
              max={filtersMinMax.price[1]}
              currentValues={filters.price}
              handler={(newValues) => {
                handleChange(newValues, "price");
              }}
            />
          </Filter>
        </FilterElement>
        <FilterElement>
          <FilterTitle>Duration</FilterTitle>
          <Filter>
            <SliderInput
              min={filtersMinMax.duration[0]}
              max={filtersMinMax.duration[1]}
              currentValues={filters.duration}
              handler={(newValues) => {
                handleChange(newValues, "duration");
              }}
            />
          </Filter>
        </FilterElement>
        <FilterElement>
          <FilterTitle>Group Size</FilterTitle>
          <Filter>
            <SliderInput
              min={filtersMinMax.groupSize[0]}
              max={filtersMinMax.groupSize[1]}
              currentValues={filters.groupSize}
              handler={(newValues) => {
                handleChange(newValues, "groupSize");
              }}
            />
          </Filter>
        </FilterElement>
        <FilterElement>
          <FilterTitle>Difficulty</FilterTitle>
          <Filter>
            <SliderSteps
              steps={difficultiesInfoList}
              currentValues={filters.difficulty}
              handler={(newValues) => {
                handleChange(newValues, "difficulty");
              }}
            />
          </Filter>
        </FilterElement>
        <FilterElement>
          <FilterTitle>Category</FilterTitle>
          <FilterCheckBoxes>
            <CheckBoxes
              options={categoriesInfoList}
              allowSelectAll={true}
              selection={filters.categories}
              handler={(newValues) => {
                handleChange(newValues as TInfo<string>[], "categories");
              }}
            />
          </FilterCheckBoxes>
        </FilterElement>
      </Filters>
      <ButtonSection>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.cancel}
          onClick={() => handleReset()}>
          Reset filters
        </Button>
        <Button onClick={() => handleConfirm()}>Show Results</Button>
      </ButtonSection>
    </Modal>
  );
};

export default FiltersModal;
