import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const sortPossibilites: Info[] = [
    { id: "popularity", value: "Popularity" },
    { id: "pricing", value: "Pricing" },
    { id: "rating", value: "Rating" },
    { id: "lastminute", value: "Last minute" },
  ];

  const [currentSort, setCurrentSort] = useState<Info>(sortPossibilites[0]);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const handleDropdown = (value: Info): void => {
    setCurrentSort(value);
  };

  const handleOpenFilters = (state: boolean): void => {
    document.body.style.overflowY = state ? "hidden" : "scroll";
    setFiltersOpen(state);
  };
  const handleCloseFilters = () => {
    setFiltersOpen(false);
  };

  useEffect(() => {
    if (currentSort.id !== "popularity")
      searchParams.set("sort", currentSort.id.toString());
    else searchParams.delete("sort");
    setSearchParams(searchParams);
  }, [currentSort, searchParams]);

  return (
    <SearchFiltersContainer>
      <SearchFiltersWrapper>
        <Categories>
          <Link to="/alltours?difficulty=family">
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Family Tours
            </Button>
          </Link>
          <Link to="/alltours?difficulty=expert">
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Advanced Tours
            </Button>
          </Link>
          <Link to="/alltours?category=mountain">
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Mountain Tours
            </Button>
          </Link>
          <Link to="/alltours?category=desert">
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
              Desert Tours
            </Button>
          </Link>
          <Link to="/alltours?duration[gte]=10">
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
              10Days+ Tours
            </Button>
          </Link>
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
            handleInput={handleDropdown}
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
