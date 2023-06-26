import {
  AdminNavbarCenterContainer,
  AdminNavbarContainer,
} from "./adminNavbar.style";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AllUsersNavbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchUser, setSearchUser] = useState<string>("");

  const handleSubmitSearchUser = () => {
    if (searchUser.length) searchParams.set("search", searchUser.trim());
    else searchParams.delete("search");
    setSearchParams(searchParams);
  };
  const handleDeleteSearchUser = () => {
    setSearchUser("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) setSearchUser(searchParam);
  }, [searchParams]);

  return (
    <AdminNavbarContainer>
      <AdminNavbarCenterContainer>
        <SearchInput
          handleDelete={handleDeleteSearchUser}
          handleSubmit={handleSubmitSearchUser}
          placeholder={"firstname, lastname, email, ..."}
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
          adminStyle={true}
          style={{ width: "52rem" }}
        />
      </AdminNavbarCenterContainer>
    </AdminNavbarContainer>
  );
};

export default AllUsersNavbar;
