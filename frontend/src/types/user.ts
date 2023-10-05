import { ReactElement, ReactNode } from "react";

export enum USER_ROLE_TYPES {
  USER = "user",
  GUIDE = "guide",
  LEAD_GUIDE = "lead-guide",
  ADMIN = "admin",
}

export type TUser = {
  email: string;
  firstname: string;
  lastname: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
  role: USER_ROLE_TYPES;
  wishlist: string[];
  id: string;
  _id?: string;
  token?: string;
  tmp?: string;
  cart?: string;
};

export type TExtendedUser = TUser & {
  active: boolean;
  numOfBookings: number;
  numOfRatings: number;
  avgRating: number;
};
export type TExtendedGuide = TUser & {
  active: boolean;
  tours: {
    _id: string;
    name: string;
    slug: string;
  }[];
};

export type UpdateUserData = {
  role?: USER_ROLE_TYPES;
  firstname?: string;
  lastname?: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
  wishlist?: string[];
  active?: boolean;
};

export type UpdateUserPasswordData = {
  passwordCurrent?: string;
  password?: string;
  passwordConfirm?: string;
  stayConnected?: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TGuideRole = "guide" | "lead-guide";

export type CreateTourGuideData = {
  firstname: string;
  lastname: string;
  email: string;
  role: TGuideRole;
};

export type PasswordsData = {
  password: string;
  passwordConfirm: string;
  logout: boolean;
};

export type GuidePasswordsData = Omit<PasswordsData, "logout">;

export type CheckoutInputsUserData = {
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
};

export type UpdateUserInputData = {
  firstname?: string;
  lastname?: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
};

export type UserNameData = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type UserTableInfo = {
  key: React.Key;
  name: ReactElement;
  email: string;
  phoneNumber: string;
  birthDate: string;
  bookingsNumber: number;
  reviewsNumber: number;
  ratingAverage: number;
  status: "active" | "deactivated";
};

export type GuideTableInfo = {
  key: React.Key;
  role: ReactElement;
  name: ReactElement;
  email: string;
  phoneNumber: string;
  birthDate: string;
  tours: ReactNode;
  status: "active" | "deactivated";
};

export type GeneralUserTableInfo = {
  key: React.Key;
  name: ReactElement;
  email: string;
  phoneNumber: string;
  birthDate: string;
  bookingsNumber?: number;
  reviewsNumber?: number;
  ratingAverage?: number;
  tours?: ReactNode;
  status: "active" | "deactivated";
};

export const guideRolesList = [
  { value: "guide", id: "guide" },
  { value: "lead-guide", id: "lead-guide" },
];
