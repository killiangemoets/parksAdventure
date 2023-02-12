import styled from "styled-components";

import { ReactComponent as FilterSVG } from "../../../assets/filter.svg";
import { ReactComponent as SortSVG } from "../../../assets/sort-solid.svg";

export const SearchFiltersContainer = styled.div`
  width: 100%;
  padding: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchFiltersWrapper = styled.div`
  width: 100%;
  max-width: 160rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FilterIcon = styled(FilterSVG)`
  width: 2.2rem;
  height: 2.2rem;
`;
export const SortIcon = styled(SortSVG)`
  width: 2rem;
  height: 2rem;
`;
