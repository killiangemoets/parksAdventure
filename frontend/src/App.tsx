// import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndFooter from "./components/navbarAndFooterComponents/navbarAndFooter.component";
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
import ForgotPassword from "./routes/forgotPassword/forgotPassword.component";
import ResetPassword from "./routes/resetPassword/resetPassword.component";
import { useEffect, useState } from "react";
import { getUser } from "./api/authentication-requests";

import { removeUser, setUser } from "./store/user/user.action";
import Cart from "./routes/cart/cart.component";
import CheckoutLine from "./components/checkoutPagesComponents/checkoutLine/checkoutLine.component";
import OverviewStep from "./routes/overviewStep/overviewStep.component";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import ConfirmationStep from "./routes/confirmationStep/confirmationStep.component";
import ValidationStep from "./routes/validationStep/validationStep.component";
import NotFound from "./components/notFoundComponent/notFound.component";
import { applyMiddleware } from "redux";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleIsLoggedIn = async () => {
      const response = await getUser();
      // console.log("USER", response);
      if (response.user) {
        const {
          email,
          firstname,
          lastname,
          photo,
          phoneNumber,
          birthDate,
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
            id,
          })
        );
      } else {
        dispatch(removeUser());
      }
    };

    if (!window.location.href.includes("/signup/email-confirmation/"))
      handleIsLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<NavbarAndFooter />}>
        <Route index element={<Home />} />

        <Route path="alltours" element={<AllTours />} />
        <Route path="tour/:slug" element={<Tour />} />

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
        <Route path="login/forgot-password" element={<ForgotPassword />} />
        <Route path="login/reset-password/:token" element={<ResetPassword />} />

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

      <Route path="profile/" element={<UserProfile />}>
        <Route index element={<Navigate to="/profile/wishlist" />} />
        <Route path="wishlist" element={<UserWishList />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="reviews" element={<UserReviews />} />
        <Route path="add-tour" element={<AddTour />} />
        <Route path="bookings/">
          <Route index element={<UserBookings />} />
          <Route path="details/:id" element={<UserBookingDetails />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/" />}></Route> */}
      </Route>

      {/* <Route path="*" element={<Navigate to="/" />}></Route> */}

      <Route path="/" element={<NavbarAndFooter />}>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
