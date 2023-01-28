import { body, ValidationChain, query } from "express-validator";
import { AccountModel } from "../../../../models";
import {
  ACCESS_LEVEL,
  ACCESS_LEVEL_ARRAY,
  MOBILE_NUMBER,
  EMAIL,
} from "./../../../../constants/index";

const validatePutRequest: ValidationChain[] = [
  query("_id")
    .isMongoId()
    .rtrim()
    .withMessage("Must be a valid _id")
    .custom(async (value) => {
      const account = await AccountModel.findById(value);
      if (!account) {
        return Promise.reject("Account does not exist");
      }
      return;
    })
    .bail(),
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
      "Must be a string,Minimum of 12 characters,Maximum of 20 characters`"
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
  body(ACCESS_LEVEL)
    .isIn(ACCESS_LEVEL_ARRAY)
    .withMessage("Must have a valid access"),
];

export default validatePutRequest;
