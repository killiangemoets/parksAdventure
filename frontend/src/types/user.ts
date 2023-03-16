export type TUser = {
  email: string;
  firstname: string;
  lastname: string;
  photo?: string;
  phoneNumber?: string;
  birthDate?: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  _id: string;
};
