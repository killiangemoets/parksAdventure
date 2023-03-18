import { ActionWithPayload } from "../../types/actions";
import { TUser } from "../../types/user";
import { USER_ACTION_TYPES } from "./user.type";

export type SetUser = ActionWithPayload<USER_ACTION_TYPES.SET_USER, TUser>;
export type SetEmail = ActionWithPayload<USER_ACTION_TYPES.SET_EMAIL, string>;

export type UserDipatchTypes = SetUser | SetEmail;

export const setUser = (user: TUser): SetUser => {
  return { type: USER_ACTION_TYPES.SET_USER, payload: user };
};

export const setEmail = (email: string): SetEmail => {
  return { type: USER_ACTION_TYPES.SET_EMAIL, payload: email };
};
