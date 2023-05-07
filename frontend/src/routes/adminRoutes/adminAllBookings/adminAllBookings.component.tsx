import BookingCard from "../../../components/UIComponents/bookingCard/bookingCard.component";
import AllBookingsNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/allBookingsNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";

const AdminAllBookings = () => {
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Bookings</AdminSectionTitle>
        <AllBookingsNavbar />
      </AdminFixHeader>
      <AdminContent>
        {/* <BookingCard />
        <BookingCard />
        <BookingCard />
        <BookingCard /> */}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminAllBookings;
