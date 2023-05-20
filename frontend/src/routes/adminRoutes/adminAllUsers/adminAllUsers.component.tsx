import { useEffect, useState } from "react";
import AllUsersNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allUsersNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminLargeContent,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { TUser } from "../../../types/user";
import { getAllUsers } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import UsersTable from "../../../components/UIComponents/usersTable/usersTable.component";

const AdminAllUsers = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetUsers = async () => {
      setIsLoading(true);
      const response = await getAllUsers("?role=user");
      console.log(response);
      if (response.status === "success") {
        setUsers(response.data.data);
        setErrorMessage(undefined);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetUsers();
  }, []);

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
        <UsersTable />
      </AdminLargeContent>
    </AdminSectionContainer>
  );
};

export default AdminAllUsers;
