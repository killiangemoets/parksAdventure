import TourGuidesNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/tourGuidesNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";

const AdminGuides = () => {
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Tour Guides</AdminSectionTitle>
        <TourGuidesNavbar />
      </AdminFixHeader>
      <AdminContent></AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminGuides;
