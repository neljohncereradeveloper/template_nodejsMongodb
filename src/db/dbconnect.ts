import mongoose from "mongoose";
import { logger } from "../utils";

const dbconnect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_HOST!}/${process.env.DB_NAME!}`
    );
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error("Could not connect to MongoDB");
    process.exit(1);
  }
};

export default dbconnect;
