export const IS_PROD = process.env.NODE_ENV === "production" ? true : false;
export const PORT = 3001 || process.env.PORT!;
export const GENDERS = ["male", "female", "MALE", "FEMALE", "Male", "Female"];
export const ACCESS_LEVEL_ARRAY = ["Level 1", "Level 2", "Level 3"];
/** query fields */
export const FIELDS_ACCOUNT = "_id accessLevel mobileNumber email isActive";
export const FIELDS_USER = "_id fullName gender birthDate age address";
/** model name */
export const MODEL_ACCOUNT = "account";
/** fields name */
export const MODEL_USER = "user";
export const MOBILE_NUMBER = "mobileNumber";
export const EMAIL = "email";
export const PASSWORD = "password";
export const ACCESS_LEVEL = "accessLevel";
export const FULLNAME = "fullName";
export const GENDER = "gender";
export const BIRTHDATE = "birthDate";
export const AGE = "age";
export const ADDRESS = "address";
/** populates */
export const POPULATE_ACCOUNT = {
  path: MODEL_ACCOUNT,
  model: MODEL_ACCOUNT,
  select: FIELDS_ACCOUNT,
};
