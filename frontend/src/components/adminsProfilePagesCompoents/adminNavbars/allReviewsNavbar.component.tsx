import { useState } from "react";
import Dropdown, {
  DROPDOWN_TYPE_CLASSES,
} from "../../UIComponents/dropdown/dropdown.component";
import {
  AdminNavbarCenterContainer,
  AdminNavbarContainer,
  AdminNavbarLeftContainer,
  AdminNavbarRightContainer,
} from "./adminNavbar.style";
import RangeDateInput from "../../UIComponents/rangeDateInput/rangeDateInput.component";
import { SortIcon } from "../../allToursPageComponents/searchFilters/searchFilters.style";

const AllReviewsNavbar = () => {
  const usersSelection: Info[] = [{ id: "allUsers", value: "All Users" }];
  const [selectedUser, setsSlectedUser] = useState<Info>(usersSelection[0]);
  const handleUsersDropdown = (value: Info): void => {
    setsSlectedUser(value);
  };

  const toursSelection: Info[] = [{ id: "allTours", value: "All Tours" }];
  const [selectedTour, setsSlectedTour] = useState<Info>(toursSelection[0]);
  const handleToursDropdown = (value: Info): void => {
    setsSlectedTour(value);
  };

  const SortSelection: Info[] = [{ id: "mostRecent", value: "Most recent" }];
  const [selectedSort, setsSlectedSort] = useState<Info>(SortSelection[0]);
  const handleSortDropdown = (value: Info): void => {
    setsSlectedSort(value);
  };

  const RatingSelection: Info[] = [
    { id: "0-1", value: "0-1" },
    { id: "1-2", value: "1-2" },
    { id: "2-3", value: "2-3" },
    { id: "3-4", value: "3-4" },
    { id: "4-5", value: "4-5" },
  ];
  const [selectedRating, setsSlectedRating] = useState<Info>(
    RatingSelection[RatingSelection.length - 1]
  );
  const handleRatingDropdown = (value: Info): void => {
    setsSlectedRating(value);
  };

  return (
    <AdminNavbarContainer>
      <AdminNavbarLeftContainer></AdminNavbarLeftContainer>
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
          list={RatingSelection}
          handleInput={handleRatingDropdown}
        />
        <RangeDateInput
          currentValues={null}
          handleChange={(values) => {}}
          adminStyle={true}
        />
      </AdminNavbarCenterContainer>
      <AdminNavbarRightContainer>
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedSort}
          list={SortSelection}
          handleInput={handleSortDropdown}>
          <SortIcon />
        </Dropdown>
      </AdminNavbarRightContainer>
    </AdminNavbarContainer>
  );
};

export default AllReviewsNavbar;
