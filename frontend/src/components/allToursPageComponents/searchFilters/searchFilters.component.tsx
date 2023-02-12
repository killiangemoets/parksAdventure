import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DropdownInput from "../../UIComponents/dropdownInput/dropdownInput.component";
import FiltersPopup from "../filtersPopup/filtersPopup.component";

import {
  Categories,
  FilterIcon,
  Filters,
  SearchFiltersContainer,
  SearchFiltersWrapper,
  SortIcon,
} from "./searchFilters.style";

const SearchFilters = () => {
  const sortPossibilites: string[] = [
    "Popularity",
    "Pricing",
    "Rating",
    "Last Minute",
  ];

  const [currentSort, setCurrentSort] = useState<string>(sortPossibilites[0]);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const handleDropDownSelect = (value: string): void => {
    setCurrentSort(value);
  };

  const handleOpenFilters = (state: boolean): void => {
    // const newState = state ?? !filtersOpen;
    setFiltersOpen(state);
  };

  return (
    <SearchFiltersContainer>
      <SearchFiltersWrapper>
        <Categories>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Family Tours
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Advanced Tours
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Mountain Tours
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Desert Tours
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
            10Days+ Tours
          </Button>
        </Categories>
        <Filters>
          <Button onClick={() => handleOpenFilters(true)}>
            <FilterIcon />
            Filters
          </Button>
          {/* <Button>
            <SortIcon />
            Sort
          </Button> */}
          <DropdownInput
            list={sortPossibilites}
            current={currentSort}
            handler={handleDropDownSelect}
          >
            <SortIcon />
          </DropdownInput>
        </Filters>
      </SearchFiltersWrapper>
      {filtersOpen && <FiltersPopup handleOpenFilters={handleOpenFilters} />}
    </SearchFiltersContainer>
  );
};

export default SearchFilters;
