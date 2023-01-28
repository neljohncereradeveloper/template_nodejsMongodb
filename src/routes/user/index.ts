import express from "express";
import { userController } from "../../controllers";
import { returnValidationErrors } from "../../helper";
const {
  findUsers,
  createUser,
  findUserById,
  searchUser,
  findOneUser,
  updateUser,
} = userController;
/** middlewares */
import {
  validatePostRequest,
  validatePutRequest,
  validateGetRequest,
} from "../../middlewares/validation/user";

/** user main routes */
const router = express.Router();
router
  .route("/")
  .get(findUsers)
  .post(validatePostRequest, returnValidationErrors, createUser)
  .put(validatePutRequest, returnValidationErrors, updateUser)
  .delete();
router.route("/search").get(searchUser);
router
  .route("/findone")
  .get(
    validateGetRequest.validateGetRequestFullname,
    returnValidationErrors,
    findOneUser
  );
router
  .route("/:_id")
  .get(
    validateGetRequest.validateGetRequestId,
    returnValidationErrors,
    findUserById
  );

export default router;
