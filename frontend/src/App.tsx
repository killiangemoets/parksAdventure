import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndFooter, {
  FooterLayout,
} from "./components/navbarAndFooterComponents/navbarAndFooter.component";
import AllTours from "./routes/allTours/allTours.component";
import Home from "./routes/home/home.component";
import Tour from "./routes/tour/tour.component";
import UserProfile from "./components/userProfilePagesComponents/userProfile/userProfile.component";
import UserSettings from "./routes/userRoutes/userSettings/userSettings.component";
import WishList from "./routes/whishList/wishList.component";
import Signup from "./routes/signup/signup.component";
import Login from "./routes/login/login.component";
import AdminAddTour from "./routes/adminRoutes/adminAddTour/adminAddTour.component";
import EmailVerification from "./routes/emailVerification/emailVerification.component";
import EmailConfirmation from "./routes/emailConfirmation/emailConfirmation.component";
import ForgotPassword from "./routes/forgotPassword/forgotPassword.component";
import ResetPassword from "./routes/resetPassword/resetPassword.component";
import { useEffect } from "react";
import { getUser } from "./api/authentication-requests";

import { removeUser, setUser } from "./store/user/user.action";
import Cart from "./routes/cart/cart.component";
import CheckoutLine from "./components/checkoutPagesComponents/checkoutLine/checkoutLine.component";
import { AppDispatch } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationStep from "./routes/checkoutRoutes/confirmationStep/confirmationStep.component";
import NotFound from "./components/notFoundComponent/notFound.component";
import AdminAllBookings from "./routes/adminRoutes/adminAllBookings/adminAllBookings.component";
import UserBookings from "./routes/userRoutes/userBookings/userBookings.component";
import UserBookingDetails from "./routes/userRoutes/userBookingDetails/userBookingDetails.component";
import UserReviews from "./routes/userRoutes/userReviews/userReviews.component";
import UserLogout from "./routes/userRoutes/userLogout/userLogout.component";
import OverviewStep from "./routes/checkoutRoutes/overviewStep/overviewStep.component";
import ValidationStep from "./routes/checkoutRoutes/validationStep/validationStep.component";
import AdminAllReviews from "./routes/adminRoutes/adminAllReviews/adminAllReviews.component";
import AdminDashboard from "./routes/adminRoutes/adminDashboard/adminDashboard.component";
import AdminAllUsers from "./routes/adminRoutes/adminAllUsers/adminAllUsers.component";
import AdminGuides from "./routes/adminRoutes/adminGuides/adminGuides.component";
import { selectUserRole } from "./store/user/user.selector";
import { USER_ROLE_TYPES } from "./types/user";
import AdminTourNavbar from "./components/adminsProfilePagesComponents/adminNavbars/adminTourNavbar.component";
import AdminTourCalendar from "./routes/adminRoutes/adminTourCalendar/adminTourCalendar.component";
import GuideAccountActivation from "./routes/guideRoutes/guideAccountActivation/guideAccountActivation.component";
import AdminMyTours from "./routes/adminRoutes/adminMyTours/adminMyTours.component";
import AdminTourDashboard from "./routes/adminRoutes/adminTourDashboard/adminTourDashboard.component";
import Contact from "./routes/contact/contact.component";
import PrivacyPolicy from "./routes/privacyPolicy/privacyPolicy.component";
import GeneralTermsAndConditions from "./routes/generalTermsAndConditions/generalTermsAndConditions.component";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    const handleIsLoggedIn = async () => {
      try {
        const response = await getUser();
        if (response && response.user) {
          const {
            email,
            firstname,
            lastname,
            photo,
            phoneNumber,
            birthDate,
            wishlist,
            role,
            _id: id,
          } = response.user;

          dispatch(
            setUser({
              email,
              firstname,
              lastname,
              photo,
              phoneNumber,
              birthDate,
              role,
              wishlist,
              id,
            })
          );
        } else {
          dispatch(removeUser());
        }
      } catch (err) {
        dispatch(removeUser());
      }
    };
    if (!window.location.href.includes("/signup/email-confirmation/"))
      handleIsLoggedIn();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<NavbarAndFooter />}>
        <Route index element={<Home />} />

        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="general-terms-and-conditions"
          element={<GeneralTermsAndConditions />}
        />

        <Route path="alltours" element={<AllTours />} />
        <Route path="tour/:slug/" element={<AdminTourNavbar />}>
          <Route index element={<Tour />} />
          <Route path="edit" element={<AdminAddTour />} />
          <Route path="calendar" element={<AdminTourCalendar />} />
          <Route path="stats" element={<AdminTourDashboard />} />
        </Route>

        <Route path="signup" element={<Signup />} />
        <Route
          path="signup/email-verification"
          element={<EmailVerification />}
        />

        <Route path="login" element={<Login />} />
        <Route path="login/forgot-password" element={<ForgotPassword />} />

        <Route path="wishlist" element={<WishList />} />
        <Route path="cart" element={<Cart />} />

        <Route path="checkout/" element={<CheckoutLine step={2} />}>
          <Route path="step1" element={<Navigate to="/checkout/step2" />} />
          <Route path="step2" element={<OverviewStep />} />
        </Route>
        <Route path="checkout/" element={<CheckoutLine step={3} />}>
          <Route path="step3/:token" element={<ValidationStep />} />
        </Route>
        <Route path="checkout/" element={<CheckoutLine step={4} />}>
          <Route path="step4" element={<ConfirmationStep />} />
        </Route>
      </Route>

      <Route path="/" element={<FooterLayout />}>
        <Route
          path="signup/email-confirmation/:token"
          element={<EmailConfirmation />}
        />
        <Route path="login-new-user" element={<Login showLinks={false} />} />
        <Route
          path="guide-activation/:token"
          element={<GuideAccountActivation />}
        />
        <Route path="login/reset-password/:token" element={<ResetPassword />} />
      </Route>

      <Route path="profile/" element={<UserProfile />}>
        <Route
          index
          element={
            <Navigate
              to={
                userRole === USER_ROLE_TYPES.ADMIN
                  ? "/profile/dashboard"
                  : userRole === USER_ROLE_TYPES.GUIDE ||
                    userRole === USER_ROLE_TYPES.LEAD_GUIDE
                  ? "/profile/my-tours"
                  : "/profile/bookings"
              }
            />
          }
        />
        <Route path="bookings/">
          <Route index element={<UserBookings />} />
          <Route path="details/:id" element={<UserBookingDetails />} />
        </Route>
        <Route path="reviews" element={<UserReviews />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="logout" element={<UserLogout />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="all-bookings" element={<AdminAllBookings />} />
        <Route path="all-reviews" element={<AdminAllReviews />} />
        <Route path="all-users" element={<AdminAllUsers />} />
        <Route path="guides" element={<AdminGuides />} />
        <Route path="add-tour" element={<AdminAddTour />} />
        <Route path="my-tours" element={<AdminMyTours />} />
      </Route>

      <Route path="/" element={<NavbarAndFooter />}>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
