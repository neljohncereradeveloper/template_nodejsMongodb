import { Request, Response } from "express";
import { returnError, returnOk } from "../../helper";
import {
  MUserProps,
  IUserProps,
  IAccountProps,
  MAccountProps,
} from "../../types/models";
import { UserModel, AccountModel } from "../../models";
import {
  createRepo,
  updateOneRepo,
  findRepo,
  findById,
  findOneRepo,
} from "../../repository";
import { FIELDS_USER, POPULATE_ACCOUNT } from "../../constants";
import { getAge, hashPassword } from "../../utils";

/**
 * Controller create user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const createUser = async (req: Request, res: Response): Promise<Response> => {
  const {
    fullName,
    gender,
    birthDate,
    address,
    accessLevel,
    email,
    mobileNumber,
  }: IUserProps & IAccountProps = req.body;
  let user;
  try {
    const account = await createRepo<MAccountProps, IAccountProps>(
      {
        accessLevel,
        email,
        mobileNumber,
        password: (await hashPassword(req, res, "password")) as string,
      },
      AccountModel
    );
    if (account) {
      user = await createRepo<MUserProps, IUserProps>(
        {
          account: account._id,
          fullName,
          gender,
          birthDate,
          age: getAge(birthDate),
          address,
        },
        UserModel
      );
    }
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller update user informations
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const updateUser = async (req: Request, res: Response): Promise<Response> => {
  let { fullName, gender, birthDate, address }: IUserProps = req.body;
  const { _id } = req.query;
  let user;
  try {
    const userUpdate = await updateOneRepo<MUserProps, IUserProps>(
      _id as any,
      { fullName, gender, birthDate, age: getAge(birthDate), address },
      UserModel
    );
    if (userUpdate) {
      user = await findById(UserModel, _id as string, FIELDS_USER);
    }
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller find users
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const findUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await findRepo(UserModel, {}, FIELDS_USER, [
      POPULATE_ACCOUNT,
    ]);
    return returnOk(res, { data: users });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller find one user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const findOneUser = async (req: Request, res: Response): Promise<Response> => {
  const { fullName } = req.query;
  try {
    const user = await findOneRepo(UserModel, { fullName }, FIELDS_USER, [
      POPULATE_ACCOUNT,
    ]);
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller find user by id
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const findUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await findById(UserModel, req.params._id, FIELDS_USER, [
      POPULATE_ACCOUNT,
    ]);
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};
/**
 * Controller search user
 *
 * @param req `Request`
 * @param res `Response`
 * @returns `Promise`
 */
const searchUser = async (req: Request, res: Response): Promise<Response> => {
  const { text, level } = req.query;
  try {
    const user = await UserModel.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "account",
          foreignField: "_id",
          pipeline: [
            // {
            //   $match: {
            //     $expr: {
            //       $eq: ["$accessLevel", { $regex: level, $options: "i" }],
            //     },
            //   },
            // },
            {
              $project: {
                accessLevel: 1,
                mobileNumber: 1,
                email: 1,
                isActive: 1,
              },
            },
          ],
          as: "account",
        },
      },
      { $unwind: "$account" },
      {
        $match: {
          $or: [
            { gender: { $regex: text, $options: "i" } },
            { fullName: { $regex: text, $options: "i" } },
            { address: { $regex: text, $options: "i" } },
          ],
          $and: [
            { "account.accessLevel": { $regex: level, $options: "i" } },
            { "account.isActive": true },
          ],
        },
      },
    ]);
    return returnOk(res, { data: user });
  } catch (error) {
    return returnError(req, res);
  }
};

export default {
  createUser,
  updateUser,
  findUsers,
  findUserById,
  findOneUser,
  searchUser,
};
