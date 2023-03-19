export type TUser = {
  email: string;
  firstname: string;
  lastname: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: Date;
  role: "user" | "guide" | "lead-guide" | "admin";
  id: string;
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
