import { Model } from "mongoose";

const findById = async <T>(
  model: Model<T>,
  _id: string,
  select?: string,
  populate?: any
): Promise<T> => {
  let result = new Promise<T>((resolve, reject) => {
    let query = model.findById(_id);
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

export default findById;
