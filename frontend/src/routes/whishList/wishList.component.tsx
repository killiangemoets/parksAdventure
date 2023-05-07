import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/UIComponents/pagination/pagination.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../components/UIComponents/title/title.component";
import { UserWishListContainer, WishListCards } from "./wishList.style";
import { selectUserWishlist } from "../../store/user/user.selector";
import { clearTours, fetchToursAsync } from "../../store/tours/tours.action";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";
import {
  selectTours,
  selectToursIsLoading,
  selectToursTotal,
} from "../../store/tours/tours.selector";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../components/UIComponents/spinner/spinner.component";
import { NoResultsMessage } from "../allTours/allTours.style";
import ToursCards from "../../components/allToursPageComponents/toursCards/toursCards.component";

export const WishList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const wishlist = useSelector(selectUserWishlist);
  const totalResults = useSelector(selectToursTotal);
  const isLoading = useSelector(selectToursIsLoading);
  const tours = useSelector(selectTours);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    setCurrentPage(pageParam ? +pageParam : 1);
  }, [searchParams]);

  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      dispatch(clearTours());
      return;
    }
    if (
      process.env.REACT_APP_RESULTS_PER_PAGE &&
      wishlist.length <=
        +process.env.REACT_APP_RESULTS_PER_PAGE * (currentPage - 1)
    ) {
      const newPage = currentPage - 1;
      if (newPage > 1) searchParams.set("page", newPage.toString());
      else searchParams.delete("page");
      setSearchParams(searchParams);
    }
    const requestStringFromWishlist = wishlist?.reduce(
      (acc, wishedTour) => acc + `&id=${wishedTour}`,
      ""
    );
    const requestStringFromUrl = window.location.href.split("?")[1];

    const requestString =
      `?limit=${process.env.REACT_APP_RESULTS_PER_PAGE}` +
      requestStringFromWishlist +
      (requestStringFromUrl ? `&${requestStringFromUrl}` : "");

    dispatch(fetchToursAsync(requestString));
  }, [searchParams, wishlist]);

  useEffect(() => {
    const newNumberOfPages = Math.ceil(
      totalResults /
        (process.env.REACT_APP_RESULTS_PER_PAGE
          ? +process.env.REACT_APP_RESULTS_PER_PAGE
          : 12)
    );
    setNumberOfPages(newNumberOfPages);
  }, [totalResults]);
  return (
    <UserWishListContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Wishlist</Title>
      {isLoading ? (
        <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
      ) : !tours.length ? (
        <NoResultsMessage>Your wishlist is empty</NoResultsMessage>
      ) : (
        <WishListCards>
          <ToursCards />
        </WishListCards>
      )}
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
    </UserWishListContainer>
  );
};

export default WishList;
