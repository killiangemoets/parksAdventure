import { Action, ActionWithPayload } from "../../types/actions";
import { UpdateUserData, TUser } from "../../types/user";
import { USER_ACTION_TYPES } from "./user.type";

export type SetUser = ActionWithPayload<USER_ACTION_TYPES.SET_USER, TUser>;
export type SetEmail = ActionWithPayload<USER_ACTION_TYPES.SET_EMAIL, string>;
export type RemoveUser = Action<USER_ACTION_TYPES.REMOVE_USER>;
export type UpdateUser = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USER, UpdateUserData>;

export type UserDipatchTypes = SetUser | SetEmail | RemoveUser | UpdateUser;

export const setUser = (user: TUser): SetUser => {
  return { type: USER_ACTION_TYPES.SET_USER, payload: user };
};

export const setEmail = (email: string): SetEmail => {
  return { type: USER_ACTION_TYPES.SET_EMAIL, payload: email };
};

export const removeUser = (): RemoveUser => {
  return { type: USER_ACTION_TYPES.REMOVE_USER };
};

export const updateUser = (userData: UpdateUserData): UpdateUser  => {
  return { type: USER_ACTION_TYPES.UPDATE_USER, payload: userData };
};