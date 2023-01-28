import { model, Schema } from "mongoose";
import { GENDERS, MODEL_ACCOUNT, MODEL_USER } from "../../constants";
import { MUserProps } from "../../types/models";

/** Schema */
const UserSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: MODEL_ACCOUNT,
    },
    fullName: {
      type: String,
      require: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
      enum: GENDERS,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<MUserProps>(MODEL_USER, UserSchema);

export default UserModel;
