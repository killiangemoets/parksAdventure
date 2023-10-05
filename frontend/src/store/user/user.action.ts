import { Action, ActionWithPayload } from "../../types/actions";
import { UpdateUserData, TUser } from "../../types/user";
import { USER_ACTION_TYPES } from "./user.type";

export type SetUser = ActionWithPayload<USER_ACTION_TYPES.SET_USER, TUser>;
export type SetEmail = ActionWithPayload<USER_ACTION_TYPES.SET_EMAIL, string>;
export type SetTmp = ActionWithPayload<USER_ACTION_TYPES.SET_TMP, string>;
export type RemoveUser = Action<USER_ACTION_TYPES.REMOVE_USER>;
export type RemoveTmp = Action<USER_ACTION_TYPES.REMOVE_TMP>;
export type UpdateUser = ActionWithPayload<
  USER_ACTION_TYPES.UPDATE_USER,
  UpdateUserData
>;

export type UserDipatchTypes =
  | SetUser
  | SetEmail
  | SetTmp
  | RemoveUser
  | RemoveTmp
  | UpdateUser;

export const setUser = (user: TUser): SetUser => {
  return { type: USER_ACTION_TYPES.SET_USER, payload: user };
};

export const setEmail = (email: string): SetEmail => {
  return { type: USER_ACTION_TYPES.SET_EMAIL, payload: email };
};

export const setTmp = (tmp: string): SetTmp => {
  return { type: USER_ACTION_TYPES.SET_TMP, payload: tmp };
};

export const removeUser = (): RemoveUser => {
  return { type: USER_ACTION_TYPES.REMOVE_USER };
};

export const removeTmp = (): RemoveTmp => {
  return { type: USER_ACTION_TYPES.REMOVE_TMP };
};

export const updateUser = (userData: UpdateUserData): UpdateUser => {
  return { type: USER_ACTION_TYPES.UPDATE_USER, payload: userData };
};
