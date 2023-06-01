import { FC, useEffect, useState } from "react";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import {
  AdminNavbarCenterContainer,
  AdminNavbarContainer,
  AdminNavbarLeftContainer,
  AdminNavbarRightContainer,
  UserContainer,
  UserEmail,
  UserName,
} from "./adminNavbar.style";
import RangeDateInput from "../../UIComponents/rangeDateInput/rangeDateInput.component";
import { SortIcon } from "../../allToursPageComponents/searchFilters/searchFilters.style";
import { TourNameData } from "../../../types/tour";
import { UserNameData } from "../../../types/user";
import { capitalizeString } from "../../../utils/formatting/formatString";
import { useSearchParams } from "react-router-dom";
import { isValidDate } from "@fullcalendar/core/internal";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CheckBoxes from "../../UIComponents/checkBoxes/checkBoxes.component";

export type AllReviewsNavbarProps = {
  tourNames: TourNameData[];
  userNames: UserNameData[];
};

const ratingSelection: Info[] = [
  { id: "allRatings", value: "All Ratings" },
  { id: "0-1", value: "0-1" },
  { id: "1-2", value: "1-2" },
  { id: "2-3", value: "2-3" },
  { id: "3-4", value: "3-4" },
  { id: "4-5", value: "4-5" },
];

const sortSelection: Info[] = [
  { id: "-createdAt", value: "Most recent" },
  { id: "-rating", value: "Highest rating" },
  { id: "rating", value: "Lowest rating" },
];

const AllReviewsNavbar: FC<AllReviewsNavbarProps> = ({
  tourNames,
  userNames,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [usersSelection, setUsersSelection] = useState<Info[]>([
    { id: "allUsers", value: "All Users" },
  ]);
  const [selectedUser, setSelectedUser] = useState<Info>(usersSelection[0]);

  const [toursSelection, setToursSelection] = useState<Info[]>([
    { id: "allTours", value: "All Tours" },
  ]);

  const [showHidden, setShowHidden] = useState<TInfo<string>[]>([
    { value: "Show Hidden Reviews", id: "showHidden" },
  ]);
  const [selectedTour, setSelectedTour] = useState<Info>(toursSelection[0]);

  const [selectedSort, setSelectedSort] = useState<Info>(sortSelection[0]);

  const [selectedRating, setSelectedRating] = useState<Info>(
    ratingSelection[0]
  );
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

  const handleUsersDropdown = (value: Info): void => {
    if (value.id === "allUsers") searchParams.delete("user");
    else searchParams.set("user", value.id.toString());
    setSearchParams(searchParams);
  };

  const handleShowHidden = (value: TInfo<string>[]): void => {
    if (value.length > 0) searchParams.delete("hidden");
    else searchParams.set("hidden", "false");
    setSearchParams(searchParams);
  };

  const handleToursDropdown = (value: Info): void => {
    if (value.id === "allTours") searchParams.delete("tour");
    else searchParams.set("tour", value.id.toString());
    setSearchParams(searchParams);
  };

  const handleRatingDropdown = (value: Info): void => {
    if (value.id === "allRatings") {
      searchParams.delete("rating[gte]");
      searchParams.delete("rating[lte]");
      setSelectedRating(ratingSelection[0]);
    } else {
      searchParams.set("rating[gte]", value.id.toString().split("-")[0]);
      searchParams.set("rating[lte]", value.id.toString().split("-")[1]);
    }
    setSearchParams(searchParams);
  };

  const handleSortDropdown = (value: Info): void => {
    setSelectedSort(value);
    if (value.id !== "-createdAt")
      searchParams.set("sort", value.id.toString());
    else searchParams.delete("sort");
    setSearchParams(searchParams);
  };

  const handleChangeDates = (newDates: any) => {
    setDates(newDates);
    if (newDates) {
      searchParams.set("createdAt[gte]", newDates[0].format("YYYY-MM-DD"));
      searchParams.set("createdAt[lte]", newDates[1].format("YYYY-MM-DD"));
    } else {
      searchParams.delete("createdAt[gte]");
      searchParams.delete("createdAt[lte]");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const newUserSelection = userNames.map((user) => ({
      id: user._id,
      value: (
        <UserContainer>
          <UserName>{`${user.firstname} ${user.lastname}`}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserContainer>
      ),
    }));
    setUsersSelection([
      { id: "allUsers", value: "All Users" },
      ...newUserSelection,
    ]);
  }, [userNames]);

  useEffect(() => {
    const newToursSelection = tourNames.map((tour) => ({
      id: tour._id,
      value: capitalizeString(tour.name),
    }));
    setToursSelection([
      { id: "allTours", value: "All Tours" },
      ...newToursSelection,
    ]);
  }, [tourNames]);

  useEffect(() => {
    const currentUserId = searchParams.get("user");
    if (currentUserId) {
      const user = userNames.find((user) => user._id === currentUserId);

      if (user && user?._id) {
        return setSelectedUser({
          id: user._id,
          value: `${user?.firstname} ${user?.lastname}`,
        });
      }
    }
    setSelectedUser({ id: "allUsers", value: "All Users" });
  }, [searchParams, userNames]);

  useEffect(() => {
    const showHiddenParam = searchParams.get("hidden");
    if (showHiddenParam) setShowHidden([]);
    else setShowHidden([{ value: "Show Hidden Reviews", id: "showHidden" }]);
  }, [searchParams, showHidden]);

  useEffect(() => {
    const currentTourId = searchParams.get("tour");
    if (currentTourId) {
      const tour = tourNames.find((tour) => tour._id === currentTourId);
      if (tour)
        return setSelectedTour({
          id: tour._id,
          value: capitalizeString(tour.name),
        });
    }
    setSelectedTour({ id: "allTours", value: "All Tours" });
  }, [searchParams, tourNames]);

  useEffect(() => {
    const ratingFromParam = searchParams.get("rating[gte]");
    const ratingToParam = searchParams.get("rating[lte]");
    if (ratingFromParam && ratingToParam) {
      const rating = ratingSelection.find(
        (rating) => rating.id === `${ratingFromParam}-${ratingToParam}`
      );
      if (rating) setSelectedRating(rating);
      else setSelectedRating(ratingSelection[0]);
    }

    const dateFromParam = searchParams.get("createdAt[gte]");
    const dateToParam = searchParams.get("createdAt[lte]");
    if (
      dateFromParam &&
      dateToParam &&
      isValidDate(new Date(dateFromParam)) &&
      isValidDate(new Date(dateToParam))
    ) {
      setDates([dayjs(dateFromParam), dayjs(dateToParam)]);
    }

    const sortParam = searchParams.get("sort");
    const sortPossibility = sortSelection.find(
      (sortPossibility) => sortPossibility.id === sortParam
    );
    if (sortPossibility) setSelectedSort(sortPossibility);
    else {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <AdminNavbarContainer>
      <AdminNavbarLeftContainer>
        <CheckBoxes
          options={[{ value: "Show Hidden Reviews", id: "showHidden" }]}
          allowSelectAll={false}
          selection={showHidden}
          handler={(newValues) => {
            handleShowHidden(newValues as TInfo<string>[]);
          }}
        />
      </AdminNavbarLeftContainer>
      <AdminNavbarCenterContainer>
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedUser}
          list={usersSelection}
          handleInput={handleUsersDropdown}
        />
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedTour}
          list={toursSelection}
          handleInput={handleToursDropdown}
        />
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedRating}
          list={ratingSelection}
          handleInput={handleRatingDropdown}
        />
        <RangeDateInput
          currentValues={dates}
          handleChange={handleChangeDates}
          adminStyle={true}
          enableAllDates={true}
        />
      </AdminNavbarCenterContainer>
      <AdminNavbarRightContainer>
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedSort}
          list={sortSelection}
          handleInput={handleSortDropdown}>
          <SortIcon />
        </Dropdown>
      </AdminNavbarRightContainer>
    </AdminNavbarContainer>
  );
};

export default AllReviewsNavbar;
