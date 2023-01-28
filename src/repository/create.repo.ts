import { Model } from "mongoose";

const createRepo = async <T, IT>(body: IT, model: Model<T>): Promise<T> => {
  const result = new Promise<T>((resolve, reject) => {
    model.create(body, (err: any, res: T) => {
      if (err) {
        reject(err);
      } else {
        resolve(<T>res);
      }
    });
  });

  return result;
};

export default createRepo;
