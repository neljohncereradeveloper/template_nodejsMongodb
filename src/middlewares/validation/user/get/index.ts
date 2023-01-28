import { ValidationChain, query, param } from "express-validator";
import { FULLNAME } from "./../../../../constants/index";

const validateGetRequestFullname: ValidationChain[] = [
  query(FULLNAME).rtrim().isString().toLowerCase(),
];
const validateGetRequestId: ValidationChain[] = [
  param("_id").isMongoId().rtrim().withMessage("Must be a valid _id"),
];

export default { validateGetRequestFullname, validateGetRequestId };
