import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useSearchParams } from "react-router-dom";
import { selectUserId } from "../../../store/user/user.selector";
import {
  selectTours,
  selectToursIsLoading,
  selectToursTotal,
} from "../../../store/tours/tours.selector";
import { useEffect, useState } from "react";
import { fetchToursAsync } from "../../../store/tours/tours.action";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { NoResultsMessage } from "../../allTours/allTours.style";
import ToursCards from "../../../components/allToursPageComponents/toursCards/toursCards.component";
import Pagination from "../../../components/UIComponents/pagination/pagination.component";
import { AdminMyToursContainer, MyToursCards } from "./adminMyTours.style";

export const AdminMyTours = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector(selectUserId);

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
    const requestStringFromUrl = window.location.href.split("?")[1];
    const requestString =
      `?limit=${process.env.REACT_APP_RESULTS_PER_PAGE}&guides=${userId}` +
      (requestStringFromUrl ? `&${requestStringFromUrl}` : "");
    dispatch(fetchToursAsync(requestString));
  }, [dispatch, searchParams, userId]);

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
    <AdminMyToursContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>My Tours</Title>
      {isLoading ? (
        <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
      ) : !tours.length ? (
        <NoResultsMessage>
          You don't have any tour assigned to you
        </NoResultsMessage>
      ) : (
        <MyToursCards>
          <ToursCards />
        </MyToursCards>
      )}
      {tours.length > 0 && numberOfPages > 1 && (
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
      )}
    </AdminMyToursContainer>
  );
};

export default AdminMyTours;
