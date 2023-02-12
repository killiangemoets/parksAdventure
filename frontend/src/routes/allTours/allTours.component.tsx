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

    // const tourCards = document.querySelector(".tour-cards");
    // const searchMap = document.querySelector(".search-map");
    // console.log({ tourCards, searchMap });
    // if (!tourCards || !searchMap) return;
    // const tourCardsTop = tourCards.getBoundingClientRect().top;
    // const tourCardsBottom = tourCards.getBoundingClientRect().bottom;

    if (tourCardsTop <= 80) {
      setFix(true);
      // searchMap.classList.add("fix");
    } else {
      setFix(false);
      // searchMap.classList.remove("fix");
    }
    if (tourCardsBottom < window.innerHeight) {
      setReduceHeight(true);
      setFix(false);
      // searchMap.classList.add("move-bottom");
      // searchMap.classList.remove("fix");
    } else {
      setReduceHeight(false);
      // searchMap.classList.remove("move-bottom");
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
        <AllToursResultsLeft
          mapOpen={mapOpen}
          ref={tourCardsResultRef}
          // className="tour-cards"
        >
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
