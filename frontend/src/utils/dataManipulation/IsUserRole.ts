import { USER_ROLE_TYPES } from "../../types/user";

export const isUserAdminOrGuide = (userRole?: USER_ROLE_TYPES) => {
  if (
    userRole === USER_ROLE_TYPES.ADMIN ||
    userRole === USER_ROLE_TYPES.LEAD_GUIDE ||
    userRole === USER_ROLE_TYPES.GUIDE
  )
    return true;
  return false;
};

export const isUser = (userRole?: USER_ROLE_TYPES) => {
  if (userRole === USER_ROLE_TYPES.USER) return true;
  return false;
};
