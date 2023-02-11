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
  const sortPossibilites = ["Popularity", "Pricing", "Rating", "Last Minute"];

  const [currentSort, setCurrentSort] = useState(sortPossibilites[0]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleDropDownSelect = (value) => {
    setCurrentSort(value);
  };

  const handleOpenFilters = (state = undefined) => {
    const newState = state ?? !filtersOpen;
    setFiltersOpen(newState);
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
          <Button onClick={handleOpenFilters}>
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
