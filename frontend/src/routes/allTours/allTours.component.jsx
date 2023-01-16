import AllToursHeader from "../../components/allToursPageComponents/allToursHeader/allToursHeader.component";
import Pagination from "../../components/UIComponents/pagination/pagination.component";
import SearchFilter from "../../components/allToursPageComponents/searchFilters/searchFilters.component";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards.component";
import ToursMap from "../../components/allToursPageComponents/toursMap/toursMap.component";
import { AllToursContainer } from "./allTours.style";
import FiltersPopup from "../../components/allToursPageComponents/filtersPopup/filtersPopup.component";

const AllTours = () => {
  return (
    <AllToursContainer>
      <AllToursHeader />
      <SearchFilter />
      <ToursMap />
      <ToursCards />
      <Pagination />
      {/* <FiltersPopup /> */}
    </AllToursContainer>
  );
};

export default AllTours;
