import { useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../store/user/user.selector";
import { selectTourGuides } from "../store/tour/tour.selector";
import { USER_ROLE_TYPES } from "../types/user";

const useHasTourNavbar = () => {
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const tourGuides = useSelector(selectTourGuides);

  if (userRole === USER_ROLE_TYPES.ADMIN) return true;
  if (
    userRole === USER_ROLE_TYPES.LEAD_GUIDE ||
    userRole === USER_ROLE_TYPES.GUIDE
  ) {
    return tourGuides
      ? Boolean(tourGuides.find((tourGuide) => tourGuide._id === userId))
      : false;
  }
  return false;
};

export default useHasTourNavbar;
