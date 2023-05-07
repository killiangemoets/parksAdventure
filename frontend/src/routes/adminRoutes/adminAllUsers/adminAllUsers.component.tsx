import AllUsersNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allUsersNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";

const AdminAllUsers = () => {
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Users</AdminSectionTitle>
        <AllUsersNavbar />
      </AdminFixHeader>
      <AdminContent></AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllUsers;
