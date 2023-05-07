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
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import RangeDateInput from "../../UIComponents/rangeDateInput/rangeDateInput.component";
import { SortIcon } from "../../allToursPageComponents/searchFilters/searchFilters.style";

const AllBookingsNavbar = () => {
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
        <SearchInput
          handleDelete={() => {}}
          handleSubmit={() => {}}
          placeholder={"Reference number"}
          adminStyle={true}
        />
        <RangeDateInput
          currentValues={null}
          handleChange={(values) => {}}
          adminStyle={true}
        />
        <Dropdown
          dropdownType={DROPDOWN_TYPE_CLASSES.input}
          current={selectedSort}
          list={SortSelection}
          handleInput={handleSortDropdown}>
          <SortIcon />
        </Dropdown>
      </AdminNavbarCenterContainer>
      <AdminNavbarRightContainer></AdminNavbarRightContainer>
    </AdminNavbarContainer>
  );
};

export default AllBookingsNavbar;
