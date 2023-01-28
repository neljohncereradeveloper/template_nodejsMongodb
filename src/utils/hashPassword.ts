import { Request, Response } from "Express";
import bcrypt from "bcryptjs";
import { logger } from "../utils";

const hashPassword = async(req: Request, res: Response, password: string) => {
  let hashedPassword;
  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
      logger.error(
        `500 - Password hashing error - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
      return res.status(500).json({
        error: true,
        message: "Password hashing error",
      });
  }

  return hashedPassword;
};

export default hashPassword;
