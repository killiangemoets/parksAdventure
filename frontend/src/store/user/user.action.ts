import { Action, ActionWithPayload } from "../../types/actions";
import { UpdateUserData, TUser } from "../../types/user";
import { USER_ACTION_TYPES } from "./user.type";

export type SetUser = ActionWithPayload<USER_ACTION_TYPES.SET_USER, TUser>;
export type SetEmail = ActionWithPayload<USER_ACTION_TYPES.SET_EMAIL, string>;
export type SetTmp = ActionWithPayload<USER_ACTION_TYPES.SET_TMP, string>;
export type SetCart = ActionWithPayload<USER_ACTION_TYPES.SET_CART, string>;
export type RemoveUser = Action<USER_ACTION_TYPES.REMOVE_USER>;
export type RemoveTmp = Action<USER_ACTION_TYPES.REMOVE_TMP>;
export type RemoveCart = Action<USER_ACTION_TYPES.REMOVE_CART>;
export type UpdateUser = ActionWithPayload<
  USER_ACTION_TYPES.UPDATE_USER,
  UpdateUserData
>;

export type UserDipatchTypes =
  | SetUser
  | SetEmail
  | SetTmp
  | SetCart
  | RemoveUser
  | RemoveTmp
  | RemoveCart
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
export const setCart = (cart: string): SetCart => {
  return { type: USER_ACTION_TYPES.SET_CART, payload: cart };
};

export const removeUser = (): RemoveUser => {
  return { type: USER_ACTION_TYPES.REMOVE_USER };
};

export const removeTmp = (): RemoveTmp => {
  return { type: USER_ACTION_TYPES.REMOVE_TMP };
};

export const removeCart = (): RemoveCart => {
  return { type: USER_ACTION_TYPES.REMOVE_CART };
};

export const updateUser = (userData: UpdateUserData): UpdateUser => {
  return { type: USER_ACTION_TYPES.UPDATE_USER, payload: userData };
};
