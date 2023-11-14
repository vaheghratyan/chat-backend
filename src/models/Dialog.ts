import mongoose, { Schema, Document } from "mongoose";
import { isEmail } from "validator";

export interface IDialog extends Document {
  partner: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
  author: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
  lastMessage: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
}

const DialogSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model<IDialog>("User", DialogSchema);

export default DialogModel;
