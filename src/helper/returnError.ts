import { Response, Request } from "express";
import { logger } from "../utils";

const returnError = (req: Request, res: Response): Response => {
  /**
   * for internal server error
   */
  logger.error(
    `500 - Internal Server Error - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  /** return 500 */
  return res.status(500).json({
    error: true,
    message: "Internal Server Error",
  });
};

export default returnError;
