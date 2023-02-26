import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import FiltersModal from "../filtersModal/filtersModal.component";

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

  const handleDropsown = (value: Info): void => {
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
          <Dropdown
            dropdownType={DROPDOWN_TYPE_CLASSES.input}
            current={currentSort}
            list={sortPossibilites}
            handleInput={handleDropsown}
          >
            <SortIcon />
          </Dropdown>
        </Filters>
      </SearchFiltersWrapper>
      <FiltersModal
        handleCloseFilters={handleCloseFilters}
        filtersOpen={filtersOpen}
      />
    </SearchFiltersContainer>
  );
};

export default SearchFilters;
