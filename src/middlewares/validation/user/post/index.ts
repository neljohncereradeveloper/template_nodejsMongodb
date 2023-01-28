import { body, ValidationChain } from "express-validator";
import { AccountModel } from "../../../../models";
import {
  ACCESS_LEVEL,
  ACCESS_LEVEL_ARRAY,
  GENDERS,
  MOBILE_NUMBER,
  EMAIL,
  FULLNAME,
  GENDER,
  BIRTHDATE,
  ADDRESS,
} from "./../../../../constants/index";

const validatePostRequest: ValidationChain[] = [
  body(FULLNAME)
    .rtrim()
    .isString()
    .isLength({
      max: 20,
      min: 4,
    })
    .withMessage(
      "Must be string.Minimum of 4 characters.Maximum of 20 characters`"
    )
    .trim()
    .toLowerCase(),
  body(GENDER)
    .isIn(GENDERS)
    .withMessage(`Must have a valid gender.[${GENDERS}]`),
  body(BIRTHDATE).isDate().withMessage(`Must have a valid birthdate`),
  body(ADDRESS)
    .rtrim()
    .isString()
    .isLength({
      max: 200,
      min: 10,
    })
    .withMessage(
      "Must be string.Minimum of 10 characters.Maximum of 200 characters`"
    )
    .trim()
    .toLowerCase(),
  body(ACCESS_LEVEL)
    .isIn(ACCESS_LEVEL_ARRAY)
    .withMessage(`Must have a valid access. [ ${ACCESS_LEVEL_ARRAY} ]`),
  body(EMAIL)
    .rtrim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .bail()
    .isString()
    .isLength({
      max: 20,
      min: 12,
    })
    .withMessage(
      "Must be string.Minimum of 12 characters.Maximum of 20 characters`"
    )
    .bail()
    .custom(async (value) => {
      const account = await AccountModel.findOne({ email: value });
      if (account) {
        return Promise.reject("Email already in use");
      }
      return;
    })
    .trim()
    .normalizeEmail()
    .toLowerCase(),
  body(MOBILE_NUMBER)
    .rtrim()
    .isMobilePhone(["en-PH"])
    .withMessage("Must be a valid phone number"),
];

export default validatePostRequest;
