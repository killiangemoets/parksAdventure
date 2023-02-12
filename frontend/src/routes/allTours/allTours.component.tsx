import AllToursHeader from "../../components/allToursPageComponents/allToursHeader/allToursHeader.component";
import SearchFilters from "../../components/allToursPageComponents/searchFilters/searchFilters.component";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards.component";
import ToursMap from "../../components/allToursPageComponents/toursMap/toursMap.component";
import {
  AllToursContainer,
  AllToursResults,
  AllToursResultsLeft,
} from "./allTours.style";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import Pagination from "../../components/UIComponents/pagination/pagination.component";

const AllTours = () => {
  const tourCardsResultRef = useRef<HTMLDivElement | null>(null);
  const [fix, setFix] = useState<boolean>(false);
  const [reduceHeight, setReduceHeight] = useState<boolean>(false);
  const [mapOpen, setMapOpen] = useState<boolean>(false);

  const checkScroll = (): void => {
    if (!tourCardsResultRef.current) return;

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

  const handleOpenMap = (): void => {
    setMapOpen(!mapOpen);
  };

  return (
    <AllToursContainer>
      <AllToursHeader />
      <SearchFilters />
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
    </AllToursContainer>
  );
};

export default AllTours;
