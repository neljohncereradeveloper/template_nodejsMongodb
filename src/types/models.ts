import { Document } from "mongoose";
/** account model props */
export type IAccountProps = {
  accessLevel: "Level 1" | "Level 2" | "Level 3";
  mobileNumber: string;
  password?: string;
  email: string;
  isActive?: boolean;
};
export type MAccountProps = IAccountProps & Document;
/** user model props */
export type IUserProps = {
  account?: string;
  fullName: string;
  gender: "Male" | "Female";
  birthDate: Date;
  age: number;
  address: string;
};
export type MUserProps = IUserProps & Document;
