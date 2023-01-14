// import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndFooter from "./components/navbarAndFooter/navbarAndFooter.component";
import AllTours from "./routes/allTours/allTours.component";
import Home from "./routes/home/home.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavbarAndFooter />}>
        <Route index element={<Home />} />
        <Route path="/alltours" element={<AllTours />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
