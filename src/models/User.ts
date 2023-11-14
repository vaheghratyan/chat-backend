import mongoose, { Schema, Document } from "mongoose";
import { isEmail } from "validator";

export interface IUser extends Document {
  email: String;
  fullname: String;
  password: String;
  confirmed: Boolean;
  avatar?: String;
  confirmed_hash?: String;
  last_seen?: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: "Email adress is required",
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
