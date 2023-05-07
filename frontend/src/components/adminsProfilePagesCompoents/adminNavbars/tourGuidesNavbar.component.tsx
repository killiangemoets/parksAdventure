import {
  AdminNavbarCenterContainer,
  AdminNavbarContainer,
  AdminNavbarRightContainer,
} from "./adminNavbar.style";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import Button from "../../UIComponents/button/button.component";

const TourGuidesNavbar = () => {
  return (
    <AdminNavbarContainer>
      <AdminNavbarCenterContainer>
        <SearchInput
          handleDelete={() => {}}
          handleSubmit={() => {}}
          placeholder={"firstname, lastname, email, ..."}
          adminStyle={true}
          style={{ width: "52rem" }}
        />
      </AdminNavbarCenterContainer>
      <AdminNavbarRightContainer>
        <Button>Add Tour Guide</Button>
      </AdminNavbarRightContainer>
    </AdminNavbarContainer>
  );
};

export default TourGuidesNavbar;
