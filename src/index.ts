import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import session from "express-session";
// import compression from "compression";
// import helmet from "helmet";
import dbconnect from "./db/dbconnect";
import { logger } from "./utils";
import { accountRoutes, userRoutes } from "./routes";
import { IS_PROD, PORT } from "./constants";
var MongoDBSession = require("connect-mongodb-session")(session);

dotenv.config();

const main = async () => {
  const app = express();
  /** connect mongodb */
  await dbconnect();
  /* middelwares */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // app.use(helmet());
  // app.use(compression());
  /** session */
  var store = new MongoDBSession({
    uri: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
    collection: "sessions",
    maxAge: 28800, // 28800 secs is 8 hours
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
      store,
      cookie: {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 28800, // 28800 secs is 8 hours
      },
    })
  );
  /** api routes  */
  app.use("/api/account", accountRoutes);
  app.use("/api/user", userRoutes);
  /** listens */
  app.listen(PORT, () =>
    logger.info(`Server started and running on http://localhost:${PORT}`)
  );
};
// server call
main().catch((err) => {
  logger.error("Main server error : ", err);
});
