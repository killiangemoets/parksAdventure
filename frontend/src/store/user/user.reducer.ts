import { UserDipatchTypes } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";

export type UserState = {
  email?: string;
  firstname?: string;
  lastname?: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
  role?: "user" | "guide" | "lead-guide" | "admin";
  id?: string;
};

export const USER_INITIAL_STATE: UserState = {};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action = {} as UserDipatchTypes
): UserState => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case USER_ACTION_TYPES.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case USER_ACTION_TYPES.REMOVE_USER:
      return {
        email: undefined,
        firstname: undefined,
        lastname: undefined,
        photo: undefined,
        phoneNumber: undefined,
        birthDate: undefined,
        role: undefined,
        id: undefined,
      };
    default:
      return state;
  }
};
