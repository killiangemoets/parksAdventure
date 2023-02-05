import { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import DropdownInput from "../../UIComponents/dropdownInput/dropdownInput.component";

import {
  Categories,
  FilterIcon,
  Filters,
  SearchFiltersContainer,
  SearchFiltersWrapper,
  SortIcon,
} from "./searchFilters.style";

const SearchFilter = ({ handleOpenFilters }) => {
  const sortPossibilites = ["Popularity", "Pricing", "Rating", "Last Minute"];

  const [currentSort, setCurrentSort] = useState(sortPossibilites[0]);

  const handleDropDownSelect = (value) => {
    setCurrentSort(value);
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
          />
        </Filters>
      </SearchFiltersWrapper>
    </SearchFiltersContainer>
  );
};

export default SearchFilter;
