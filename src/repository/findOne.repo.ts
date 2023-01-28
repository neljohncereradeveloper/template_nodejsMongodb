import { Model } from "mongoose";

const findOneRepo = async <T>(
  model: Model<T>,
  cond: {},
  select?: string,
  populate?: any
): Promise<T> => {
  let result = new Promise<T>((resolve, reject) => {
    let query = model.findOne(cond);
    if (select) {
      query.select(select);
    }
    if (populate) {
      query = query.populate<any>(populate);
    }
    query.exec((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(<T>res);
      }
    });
  });

  return result;
};

export default findOneRepo;
