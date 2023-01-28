import { body, ValidationChain, query } from "express-validator";
import { UserModel } from "../../../../models";
import {
  GENDERS,
  FULLNAME,
  GENDER,
  BIRTHDATE,
  ADDRESS,
} from "./../../../../constants/index";

const validatePutRequest: ValidationChain[] = [
  query("_id")
    .isMongoId()
    .rtrim()
    .withMessage("Must be a valid _id")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        return Promise.reject("User does not exist");
      }
      return;
    })
    .bail(),
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
];

export default validatePutRequest;
