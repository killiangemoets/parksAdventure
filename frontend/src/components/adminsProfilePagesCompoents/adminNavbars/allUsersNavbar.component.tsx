import {
  AdminNavbarCenterContainer,
  AdminNavbarContainer,
} from "./adminNavbar.style";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";

const AllUsersNavbar = () => {
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
    </AdminNavbarContainer>
  );
};

export default AllUsersNavbar;
