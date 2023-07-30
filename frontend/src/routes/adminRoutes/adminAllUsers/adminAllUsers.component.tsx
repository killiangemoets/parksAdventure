import { useEffect, useState } from "react";
import AllUsersNavbar from "../../../components/adminsProfilePagesComponents/adminNavbars/allUsersNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesComponents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminLargeContent,
  AdminSectionContainer,
  AdminStatContainer,
  AdminStatTitle,
  AdminStatValue,
  AdminStatsSection,
} from "../adminRoutes.style";
import { TExtendedUser } from "../../../types/user";
import { getAllUsersWithDetails } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import UsersTable from "../../../components/adminsProfilePagesComponents/usersTable/usersTable.component";
import { useSearchParams } from "react-router-dom";

const AdminAllUsers = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<TExtendedUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<{
    users: number;
    bookings: number;
    reviews: number;
    avgRating: number;
  }>({
    users: 0,
    bookings: 0,
    reviews: 0,
    avgRating: 0,
  });

  const handleGetUsers = async () => {
    setIsLoading(true);

    const requestStringFromUrl = window.location.href.split("?")[1];
    const pageRequest = "";

    let requestString = `${pageRequest}`;
    if (requestStringFromUrl) requestString += `&${requestStringFromUrl}`;

    const response = await getAllUsersWithDetails(`?role=user${requestString}`);
    if (response.status === "success") {
      const usersList: TExtendedUser[] = response.data.data;
      setUsers(usersList);
      setErrorMessage(undefined);

      const newStats = usersList.reduce(
        (acc, user) => ({
          users: acc.users + 1,
          bookings: acc.bookings + user.numOfBookings,
          reviews: acc.reviews + user.numOfRatings,
          avgRating:
            acc.avgRating +
            (user?.avgRating ? user.avgRating * user.numOfRatings : 0),
        }),
        {
          users: 0,
          bookings: 0,
          reviews: 0,
          avgRating: 0,
        }
      );
      newStats.avgRating =
        Math.round((newStats.avgRating / newStats.reviews) * 100) / 100 || 0;

      setStats(newStats);
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
      <AdminStatsSection>
        <AdminStatContainer>
          <AdminStatTitle>Users:</AdminStatTitle>
          <AdminStatValue>{stats.users}</AdminStatValue>
        </AdminStatContainer>
        <AdminStatContainer>
          <AdminStatTitle>Bookings:</AdminStatTitle>
          <AdminStatValue>{stats.bookings}</AdminStatValue>
        </AdminStatContainer>
        <AdminStatContainer>
          <AdminStatTitle>Reviews:</AdminStatTitle>
          <AdminStatValue>{stats.reviews}</AdminStatValue>
        </AdminStatContainer>
        <AdminStatContainer>
          <AdminStatTitle>Avg Rating:</AdminStatTitle>
          <AdminStatValue>{stats.avgRating}</AdminStatValue>
        </AdminStatContainer>
      </AdminStatsSection>
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
