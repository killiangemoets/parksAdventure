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
};

export type UpdateUserData = {
  firstname?: string;
  lastname?: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
  wishlist?: string[];
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

export type PasswordsData = {
  password: string;
  passwordConfirm: string;
  logout: boolean;
};

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
