import { Model } from "mongoose";

const findRepo = async <T>(
  model: Model<T>,
  cond: {},
  select?: string,
  populate?: any,
  page?: number,
  limit?: number,
  sortOptions?: {}
): Promise<T[]> => {
  let result = new Promise<T[]>((resolve, reject) => {
    let query = model.find(cond);
    if (populate) {
      query = query.populate<any>(populate);
    }
    if (select) {
      query = query.select(select);
    }
    if (page && limit) {
      query = query.limit(limit).skip((page - 1) * limit);
    }
    if (sortOptions) {
      query = query.sort(sortOptions);
    }
    query.exec((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(<T[]>res);
      }
    });
  });

  return result;
};

export default findRepo;
