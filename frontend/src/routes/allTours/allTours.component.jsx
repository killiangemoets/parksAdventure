import AllToursHeader from "../../components/allToursPageComponents/allToursHeader/allToursHeader.component";
import Pagination from "../../components/allToursPageComponents/pagination/pagination.component";
import SearchFilter from "../../components/allToursPageComponents/searchFilters/searchFilters.component";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards..style";
import ToursMap from "../../components/allToursPageComponents/toursMap/toursMap.component";
import { AllToursContainer } from "./allTours.style";

const AllTours = () => {
  return (
    <AllToursContainer>
      <AllToursHeader />
      <SearchFilter />
      <ToursMap />
      <ToursCards />
      <Pagination />
    </AllToursContainer>
  );
};

export default AllTours;
