import { Response } from "express";

const returnOk = <T>(res: Response, { data }: { data: T }): Response => {
  return res.status(200).json({
    data,
    error: false,
  });
};
export default returnOk;
