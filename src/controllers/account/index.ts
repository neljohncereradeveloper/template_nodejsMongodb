import { Request, Response } from "express";
import { FIELDS_ACCOUNT } from "../../constants";
import { returnError, returnOk } from "../../helper";
import { AccountModel } from "../../models";
import { findRepo, findById, updateOneRepo } from "../../repository";
import { MAccountProps, IAccountProps } from "../../types/models";

/**
 * Controller find accounts
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const findAccounts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const accounts = await findRepo(AccountModel, {}, FIELDS_ACCOUNT);
    return returnOk(res, { data: accounts });
  } catch (error) {
    return returnError(req, res);
  }
};

/**
 * Controller find account by id
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const findAccountById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const account = await findById(
      AccountModel,
      req.params._id,
      FIELDS_ACCOUNT
    );
    return returnOk(res, { data: account });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller update account
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { accessLevel, email, mobileNumber }: IAccountProps = req.body;
  const { _id } = req.query;
  let account;
  try {
    const userUpdate = await updateOneRepo<MAccountProps, IAccountProps>(
      _id as any,
      { accessLevel, email, mobileNumber },
      AccountModel
    );
    if (userUpdate) {
      account = await findById(AccountModel, _id as string, FIELDS_ACCOUNT);
    }
    return returnOk(res, { data: account });
  } catch (error) {
    return returnError(req, res);
  }
};
export default { findAccounts, findAccountById, updateAccount };
