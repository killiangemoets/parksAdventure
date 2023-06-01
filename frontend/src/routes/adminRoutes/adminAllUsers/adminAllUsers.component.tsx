import { useEffect, useState } from "react";
import AllUsersNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allUsersNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminLargeContent,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { TExtendedUser } from "../../../types/user";
import { getAllUsersWithDetails } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import UsersTable from "../../../components/adminsProfilePagesCompoents/usersTable/usersTable.component";
import { useSearchParams } from "react-router-dom";

const AdminAllUsers = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<TExtendedUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetUsers = async () => {
    setIsLoading(true);

    const requestStringFromUrl = window.location.href.split("?")[1];
    // const pageRequest = currentPage > 1 ? `&page=${currentPage}` : "";
    const pageRequest = "";

    // let requestString = `&limit=${process.env.REACT_APP_BOOKINGS_PER_PAGE}${pageRequest}`;
    let requestString = `${pageRequest}`;
    if (requestStringFromUrl) requestString += `&${requestStringFromUrl}`;

    const response = await getAllUsersWithDetails(`?role=user${requestString}`);
    console.log(response);
    if (response.status === "success") {
      setUsers(response.data.data);
      setErrorMessage(undefined);
    } else {
      setErrorMessage("An error occured. Try to reload the page!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetUsers();
  }, [searchParams]);

  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Users</AdminSectionTitle>
        <AllUsersNavbar />
      </AdminFixHeader>
      <AdminLargeContent>
        {isLoading && (
          <AdminContentSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminContentSpinner>
        )}
        {errorMessage && (
          <AdminContentErrorMessage>{errorMessage}</AdminContentErrorMessage>
        )}
        {!isLoading && !errorMessage && (
          <UsersTable users={users} handleChange={handleGetUsers} />
        )}
      </AdminLargeContent>
    </AdminSectionContainer>
  );
};

export default AdminAllUsers;
