// import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndFooter from "./components/navbarAndFooter/navbarAndFooter.component";
import AllTours from "./routes/allTours/allTours.component";
import Home from "./routes/home/home.component";
import Tour from "./routes/tour/tour.component";
import UserProfile from "./components/userProfilePagesComponents/userProfile/userProfile.component";
import UserSettings from "./routes/userSettings/userSettings.component";
import UserWishList from "./routes/userWhishList/userWishList.component";
import UserBookings from "./routes/userBookings/userBookings.component";
import UserReviews from "./routes/userReviews/userReviews.component";
import UserBookingDetails from "./routes/userBookingDetails/userBookingDetails.component";
import Signup from "./routes/signup/signup.component";
import Login from "./routes/login/login.component";
import AddTour from "./routes/addTour/addTour.component";
import EmailVerification from "./routes/emailVerification/emailVerification.component";
import EmailConfirmation from "./routes/emailConfirmation/emailConfirmation.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarAndFooter />}>
        <Route index element={<Home />} />
        <Route path="alltours" element={<AllTours />} />
        <Route path="tour" element={<Tour />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="signup/email-verification"
          element={<EmailVerification />}
        />
        <Route
          path="signup/email-confirmation/:token"
          element={<EmailConfirmation />}
        />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="profile/" element={<UserProfile />}>
        <Route index element={<Navigate to="/profile/wishlist" />} />
        <Route path="wishlist" element={<UserWishList />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="reviews" element={<UserReviews />} />
        <Route path="add-tour" element={<AddTour />} />
        <Route path="bookings/">
          <Route index element={<UserBookings />} />
          <Route path="details" element={<UserBookingDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}

export default App;
