import { USER_ROLE_TYPES } from "../../types/user";
import { UserDipatchTypes } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";

export type UserState = {
  readonly email?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly photo?: string;
  readonly phoneNumber?: string;
  readonly birthDate?: Date;
  readonly role?: USER_ROLE_TYPES;
  readonly wishlist?: string[];
  readonly id?: string;
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
        wishlist: undefined,
        id: undefined,
      };
    case USER_ACTION_TYPES.UPDATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
