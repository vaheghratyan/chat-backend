import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { UserModel } from "./models";
import {
  UserController,
  DialogController,
  MessageController,
} from "./controllers";

import { updateLastSeen } from "./middleware";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(updateLastSeen);

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect("mongodb://localhost:5000/chat", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/user/:id", User.show);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);

app.get("/dialogs", Dialog.index);
app.delete("/dialogs/:id", Dialog.delete);
app.post("/dialogs", Dialog.create);

app.get("/messages", Messages.index);
app.delete("/messages/:id", Messages.delete);
app.post("/messages", Messages.create);

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 3000!");
});
