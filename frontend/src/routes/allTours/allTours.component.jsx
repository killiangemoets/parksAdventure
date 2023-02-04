import AllToursHeader from "../../components/allToursPageComponents/allToursHeader/allToursHeader.component";
import Pagination from "../../components/UIComponents/pagination/pagination.component";
import SearchFilter from "../../components/allToursPageComponents/searchFilters/searchFilters.component";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards.component";
import ToursMap from "../../components/allToursPageComponents/toursMap/toursMap.component";
import {
  AllToursContainer,
  AllToursResults,
  AllToursResultsLeft,
} from "./allTours.style";
import FiltersPopup from "../../components/allToursPageComponents/filtersPopup/filtersPopup.component";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

const AllTours = () => {
  const tourCardsResultRef = useRef(null);
  const [fix, setFix] = useState(false);
  const [reduceHeight, setReduceHeight] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const checkScroll = () => {
    const tourCardsTop = tourCardsResultRef.current.getBoundingClientRect().top;
    const tourCardsBottom =
      tourCardsResultRef.current.getBoundingClientRect().bottom;

    if (tourCardsTop <= 80) {
      setFix(true);
    } else {
      setFix(false);
    }
    if (tourCardsBottom < window.innerHeight) {
      setReduceHeight(true);
      setFix(false);
    } else {
      setReduceHeight(false);
    }
  };

  useLayoutEffect(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return window.addEventListener("scroll", checkScroll);
  }, []);

  const handleOpenMap = () => {
    setMapOpen(!mapOpen);
  };

  const handleOpenFilters = (state = undefined) => {
    const newState = state ?? !filtersOpen;
    setFiltersOpen(newState);
  };

  return (
    <AllToursContainer>
      <AllToursHeader />
      <SearchFilter handleOpenFilters={handleOpenFilters} />
      <AllToursResults>
        <AllToursResultsLeft mapOpen={mapOpen} ref={tourCardsResultRef}>
          <ToursCards mapOpen={mapOpen} />
          <Pagination />
        </AllToursResultsLeft>
        <ToursMap
          fix={fix}
          reduceHeight={reduceHeight}
          handleOpenMap={handleOpenMap}
          mapOpen={mapOpen}
        />
      </AllToursResults>
      {filtersOpen && <FiltersPopup handleOpenFilters={handleOpenFilters} />}
    </AllToursContainer>
  );
};

export default AllTours;
