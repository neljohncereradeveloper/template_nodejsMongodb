import { model, Schema } from "mongoose";
import { ACCESS_LEVEL_ARRAY, MODEL_ACCOUNT } from "../../constants";
import { MAccountProps } from "../../types/models";

/** Schema */
const AccountSchema = new Schema(
  {
    accessLevel: {
      type: String,
      enum: ACCESS_LEVEL_ARRAY,
      required: true,
    },
    mobileNumber: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccountModel = model<MAccountProps>(MODEL_ACCOUNT, AccountSchema);

export default AccountModel;
