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

const AllTours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const totalResults = useSelector(selectToursTotal);
  const isLoading = useSelector(selectToursIsLoading);
  const tours = useSelector(selectTours);

  const filtersRef = useRef<HTMLDivElement | null>(null);
  const allToursRef = useRef<HTMLDivElement | null>(null);
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setCurrentPage(pageParam ? +pageParam : 1);
  }, [searchParams]);

  useEffect(() => {
    if (window.scrollY > 400) window.scrollTo(0, 400);
    const requestStringFromUrl = window.location.href.split("?")[1];
    console.log(requestStringFromUrl);
    const requestString =
      `?onlyAvailables=true&limit=${process.env.REACT_APP_RESULTS_PER_PAGE}` +
      (requestStringFromUrl ? `&${requestStringFromUrl}` : "");
    console.log({ requestString });
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

  useLayoutEffect(() => {
    if (!filtersRef.current) return;

    const filtersRefAnimate = filtersRef.current.getBoundingClientRect().top;
    console.log(filtersRefAnimate);
    const onScroll = () => {
      if (!filtersRef.current || !allToursRef.current) return;
      console.log({ filtersRefAnimate, windowScrollY: window.scrollY });
      if (480 < window.scrollY + 80) {
        console.log("ok");
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
        <ToursMap handleOpenMap={handleOpenMap} mapOpen={mapOpen} />
      </AllTourFixElements>
      <AllToursResults ref={allToursRef}>
        <AllToursResultsLeft mapOpen={mapOpen}>
          <AllToursResultsCards>
            {isLoading ? (
              <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
            ) : !tours.length ? (
              <NoResultsMessage>No Results</NoResultsMessage>
            ) : (
              <ToursCards mapOpen={mapOpen} />
            )}
          </AllToursResultsCards>
          {tours.length ? (
            <Pagination
              current={currentPage}
              total={numberOfPages}
              defaultPageSize={1}
              handleChange={(value) => {
                console.log("changePage", value);
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
