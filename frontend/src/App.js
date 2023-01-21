// import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndFooter from "./components/navbarAndFooter/navbarAndFooter.component";
import AllTours from "./routes/allTours/allTours.component";
import Home from "./routes/home/home.component";
import Tour from "./routes/tour/tour.component";
import UserProfile from "./components/userProfilePagesComponents/userProfile/userProfile.component";
import UserSettings from "./routes/userSettings/userSettings.component";
import UserWishList from "./routes/userWhishList/userWishList.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarAndFooter />}>
        <Route index element={<Home />} />
        <Route path="alltours" element={<AllTours />} />
        <Route path="tour" element={<Tour />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
      <Route path="/" element={<NavbarAndFooter hideFooter={true} />}>
        <Route path="profile/" element={<UserProfile />}>
          <Route index element={<Navigate to="/profile/settings" />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="wishlist" element={<UserWishList />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
