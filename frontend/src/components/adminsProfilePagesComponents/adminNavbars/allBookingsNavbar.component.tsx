import { FC, useEffect, useState } from "react";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import {
  AdminAllBookingsNavbarCenterContainer,
  AdminAllBookingsNavbarContainer,
  AdminAllBookingsNavbarElement1,
  AdminAllBookingsNavbarElement2,
  AdminAllBookingsNavbarElement3,
  AdminAllBookingsNavbarElement4,
  AdminAllBookingsNavbarElement5,
  UserContainer,
  UserEmail,
  UserName,
} from "./adminNavbar.style";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import RangeDateInput from "../../UIComponents/rangeDateInput/rangeDateInput.component";
import { SortIcon } from "../../allToursPageComponents/searchFilters/searchFilters.style";
import { TourNameData } from "../../../types/tour";
import { UserNameData } from "../../../types/user";
import { capitalizeString } from "../../../utils/formatting/formatString";
import { useSearchParams } from "react-router-dom";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isValidDate from "../../../utils/formatting/validDate";

export type AllBookingsNavbarProps = {
  tourNames: TourNameData[];
  userNames: UserNameData[];
};

const sortSelection: Info[] = [
  { id: "-createdAt", value: "Most recent" },
  { id: "date", value: "Starting Date" },
  { id: "-group", value: "Most people" },
];

const AllBookingsNavbar: FC<AllBookingsNavbarProps> = ({
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
  const [selectedTour, setSelectedTour] = useState<Info>(toursSelection[0]);

  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null);

  const [selectedSort, setSelectedSort] = useState<Info>(sortSelection[0]);

  const handleUsersDropdown = (value: Info): void => {
    if (value.id === "allUsers") searchParams.delete("user");
    else searchParams.set("user", value.id.toString());
    setSearchParams(searchParams);
  };

  const handleToursDropdown = (value: Info): void => {
    if (value.id === "allTours") searchParams.delete("tour");
    else searchParams.set("tour", value.id.toString());
    setSearchParams(searchParams);
  };

  const handleSortDropdown = (value: Info): void => {
    setSelectedSort(value);
    if (value.id !== "-createdAt")
      searchParams.set("sort", value.id.toString());
    else searchParams.delete("sort");
    setSearchParams(searchParams);
  };

  const handleSubmitSearchRefNumber = () => {
    if (referenceNumber.length)
      searchParams.set("search", referenceNumber.toUpperCase().trim());
    else searchParams.delete("search");
    setSearchParams(searchParams);
  };
  const handleDeleteSearchRefNumber = () => {
    setReferenceNumber("");
    searchParams.delete("search");
    // searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const handleChangeDates = (newDates: any) => {
    setDates(newDates);
    if (newDates) {
      searchParams.set("date[gte]", newDates[0].format("YYYY-MM-DD"));
      searchParams.set("date[lte]", newDates[1].format("YYYY-MM-DD"));
    } else {
      searchParams.delete("date[gte]");
      searchParams.delete("date[lte]");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const newUserSelection = userNames.map((user) => ({
      id: user._id,
      value: (
        <UserContainer key={user._id}>
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
    const searchParam = searchParams.get("search");
    if (searchParam) setReferenceNumber(searchParam);

    const dateFromParam = searchParams.get("date[gte]");
    const dateToParam = searchParams.get("date[lte]");
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
  }, [searchParams, setSearchParams]);

  return (
    <AdminAllBookingsNavbarContainer>
      <AdminAllBookingsNavbarCenterContainer>
        <AdminAllBookingsNavbarElement1>
          <Dropdown
            dropdownType={DROPDOWN_TYPE_CLASSES.input}
            current={selectedUser}
            list={usersSelection}
            handleInput={handleUsersDropdown}
          />
        </AdminAllBookingsNavbarElement1>
        <AdminAllBookingsNavbarElement2>
          <Dropdown
            dropdownType={DROPDOWN_TYPE_CLASSES.input}
            current={selectedTour}
            list={toursSelection}
            handleInput={handleToursDropdown}
          />
        </AdminAllBookingsNavbarElement2>

        <AdminAllBookingsNavbarElement3>
          <SearchInput
            handleDelete={handleDeleteSearchRefNumber}
            handleSubmit={handleSubmitSearchRefNumber}
            placeholder={"Reference number"}
            value={referenceNumber}
            onChange={(e) => {
              setReferenceNumber(e.target.value);
            }}
            adminStyle={true}
          />
        </AdminAllBookingsNavbarElement3>
        <AdminAllBookingsNavbarElement4>
          <RangeDateInput
            currentValues={dates}
            handleChange={handleChangeDates}
            adminStyle={true}
            enableAllDates={true}
          />
        </AdminAllBookingsNavbarElement4>
        <AdminAllBookingsNavbarElement5>
          <Dropdown
            dropdownType={DROPDOWN_TYPE_CLASSES.input}
            current={selectedSort}
            list={sortSelection}
            handleInput={handleSortDropdown}>
            <SortIcon />
          </Dropdown>
        </AdminAllBookingsNavbarElement5>
      </AdminAllBookingsNavbarCenterContainer>
    </AdminAllBookingsNavbarContainer>
  );
};

export default AllBookingsNavbar;
