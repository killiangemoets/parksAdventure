import AllToursHeader from "../../components/allToursPageComponents/allToursHeader/allToursHeader.component";
import SearchFilters from "../../components/allToursPageComponents/searchFilters/searchFilters.component";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards.component";
import ToursMap from "../../components/allToursPageComponents/toursMap/toursMap.component";
import {
  AllTourFixElements,
  AllToursContainer,
  AllToursResults,
  AllToursResultsCards,
  AllToursResultsLeft,
  NoResultsMessage,
} from "./allTours.style";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import Pagination from "../../components/UIComponents/pagination/pagination.component";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchToursAsync } from "../../store/tours/tours.action";
import { useSearchParams } from "react-router-dom";
import {
  selectToursTotal,
  selectToursIsLoading,
  selectTours,
} from "../../store/tours/tours.selector";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../components/UIComponents/spinner/spinner.component";
import { selectUserRole } from "../../store/user/user.selector";

const AllTours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const totalResults = useSelector(selectToursTotal);
  const isLoading = useSelector(selectToursIsLoading);
  const tours = useSelector(selectTours);
  const role = useSelector(selectUserRole);

  const filtersRef = useRef<HTMLDivElement | null>(null);
  const allToursRef = useRef<HTMLDivElement | null>(null);
  const [mapOpen, setMapOpen] = useState<boolean>(
    Boolean(searchParams.get("box"))
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [highlightMarker, setHighlightMarker] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setCurrentPage(pageParam ? +pageParam : 1);
  }, [searchParams]);

  useEffect(() => {
    if (window.scrollY > 400) window.scrollTo(0, 400);
    const requestStringFromUrl = window.location.href.split("?")[1];
    console.log({ requestStringFromUrl });
    const updatedRequestStringFromUrl =
      requestStringFromUrl &&
      requestStringFromUrl.replace(/(&viewstate|viewstate).*zoom/, "");
    // const onlyAvailables = role === "user" ? "&onlyAvailables=true" : "";
    const requestString =
      `?limit=${process.env.REACT_APP_RESULTS_PER_PAGE}` +
      (updatedRequestStringFromUrl ? `&${updatedRequestStringFromUrl}` : "");
    console.log(requestString);
    dispatch(fetchToursAsync(requestString));
  }, [searchParams]);

  useEffect(() => {
    const newNumberOfPages = Math.ceil(
      totalResults /
        (process.env.REACT_APP_RESULTS_PER_PAGE
          ? +process.env.REACT_APP_RESULTS_PER_PAGE
          : 12)
    );
    setNumberOfPages(newNumberOfPages);
  }, [totalResults]);

  const handleOpenMap = (): void => {
    setMapOpen(!mapOpen);
  };

  const handleOverTourCard = (id: string | undefined) => {
    setHighlightMarker(id);
  };

  useLayoutEffect(() => {
    if (!filtersRef.current) return;

    const onScroll = () => {
      if (!filtersRef.current || !allToursRef.current) return;
      if (480 < window.scrollY + 80) {
        filtersRef.current.style.position = "fixed";
        filtersRef.current.style.top = "8rem";
        filtersRef.current.style.left = "0";
        allToursRef.current.style.marginTop = "12rem";
      } else {
        filtersRef.current.style.position = "relative";
        filtersRef.current.style.top = "0";
        allToursRef.current.style.marginTop = "0";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AllToursContainer>
      <AllToursHeader />
      <AllTourFixElements ref={filtersRef}>
        <SearchFilters />
        <ToursMap
          handleOpenMap={handleOpenMap}
          mapOpen={mapOpen}
          highlightMarker={highlightMarker}
        />
      </AllTourFixElements>
      <AllToursResults ref={allToursRef}>
        <AllToursResultsLeft mapOpen={mapOpen}>
          <AllToursResultsCards>
            {isLoading ? (
              <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
            ) : !tours.length ? (
              <NoResultsMessage>No Results</NoResultsMessage>
            ) : (
              <ToursCards
                mapOpen={mapOpen}
                handleOverTourCard={handleOverTourCard}
              />
            )}
          </AllToursResultsCards>
          {tours.length && numberOfPages > 1 ? (
            <Pagination
              current={currentPage}
              total={numberOfPages}
              defaultPageSize={1}
              handleChange={(value) => {
                if (value > 1) searchParams.set("page", value.toString());
                else searchParams.delete("page");
                setSearchParams(searchParams);
              }}
            />
          ) : (
            ""
          )}
        </AllToursResultsLeft>
      </AllToursResults>
    </AllToursContainer>
  );
};

export default AllTours;
