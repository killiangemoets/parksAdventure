import Button from "../../UIComponents/button/button.component";
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
          <Button buttonType="empty">Family Tours</Button>
          <Button buttonType="empty">Advanced Tours</Button>
          <Button buttonType="empty">Mountain Tours</Button>
          <Button buttonType="empty">Desert Tours</Button>
          <Button buttonType="empty">10Day+ Tours</Button>
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
