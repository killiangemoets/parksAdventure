import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DropdownInput, {
  Info,
} from "../../UIComponents/dropdownInput/dropdownInput.component";
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
  const sortPossibilites: Info[] = [
    { id: "popularity", value: "Popularity" },
    { id: "pricing", value: "Pricing" },
    { id: "rating", value: "Rating" },
    { id: "last minute", value: "Last minute" },
  ];

  const [currentSort, setCurrentSort] = useState<Info>(sortPossibilites[0]);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const handleDropDownSelect = (value: Info): void => {
    setCurrentSort(value);
  };

  const handleOpenFilters = (state: boolean): void => {
    document.body.style.overflowY = state ? "hidden" : "scroll";
    setFiltersOpen(state);
  };
  const handleCloseFilters = () => {
    setFiltersOpen(false);
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
      <FiltersPopup
        handleCloseFilters={handleCloseFilters}
        filtersOpen={filtersOpen}
      />
    </SearchFiltersContainer>
  );
};

export default SearchFilters;
