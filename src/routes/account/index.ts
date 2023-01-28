import express from "express";
import { returnValidationErrors } from "../../helper";
import { accountController } from "../../controllers";
const { findAccounts, updateAccount, findAccountById } = accountController;
/** middlewares */
import {
  validatePutRequest,
  validateParamIdRequest,
} from "../../middlewares/validation/account";

/** account main routes */
const router = express.Router();
router
  .route("/")
  .get(findAccounts)
  .put(validatePutRequest, returnValidationErrors, updateAccount);
router
  .route("/:_id")
  .get(validateParamIdRequest, returnValidationErrors, findAccountById);

export default router;
