import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";

import {
  Categories,
  FilterIcon,
  Filters,
  SearchFiltersContainer,
  SearchFiltersWrapper,
  SortIcon,
} from "./searchFilters.style";

const SearchFilter = () => {
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
          <Button>
            <FilterIcon />
            Filters
          </Button>
          <Button>
            <SortIcon />
            Sort
          </Button>
        </Filters>
      </SearchFiltersWrapper>
    </SearchFiltersContainer>
  );
};

export default SearchFilter;
