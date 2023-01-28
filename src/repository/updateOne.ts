import { Model, ObjectId } from "mongoose";

const updateOneRepo = async <T, IT>(
  _id: ObjectId,
  body: IT,
  model: Model<T>
): Promise<T> => {
  const result = new Promise<T>((resolve, reject) => {
    model.updateOne({ _id }, body, (err: any, res: T) => {
      if (err) {
        reject(err);
      } else {
        resolve(<T>res);
      }
    });
  });

  return result;
};

export default updateOneRepo;
