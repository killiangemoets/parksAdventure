import AllReviewsNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allReviewsNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";

const AdminAllReviews = () => {
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Reviews</AdminSectionTitle>
        <AllReviewsNavbar />
      </AdminFixHeader>
      <AdminContent></AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllReviews;
