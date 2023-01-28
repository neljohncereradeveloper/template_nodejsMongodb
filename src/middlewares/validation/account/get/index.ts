import { ValidationChain, param } from "express-validator";

const validateParamIdRequest: ValidationChain[] = [
  param("_id").isMongoId().rtrim().withMessage("Must be a valid _id"),
];

export default validateParamIdRequest;
