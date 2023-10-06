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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 480 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  return (
    <AdminNavbarContainer>
      <AdminNavbarCenterContainer>
        <SearchInput
          handleDelete={handleDeleteSearchUser}
          handleSubmit={handleSubmitSearchUser}
          placeholder={"name, email, ..."}
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
          adminStyle={true}
          style={{ width: isSmallScreen ? "38rem" : "50rem" }}
        />
      </AdminNavbarCenterContainer>
    </AdminNavbarContainer>
  );
};

export default AllUsersNavbar;
