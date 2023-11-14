import express from "express";
import { MessageModel } from "../models";

class MessageController {
  index(req: express.Request, res: express.Response) {
    const dialogId: String = req.params.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            message: "Messages not found",
          });
        }
        return res.json(messages);
      });
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      text: req.body.text,
      user: req.body.user,
      dialog: req.body.dialog_id,
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    MessageModel.findOneAndRemove({ _id: id })
      .then((message) => {
        if (message) {
          res.json({
            message: `Message deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: "Message not found",
        });
      });
  }
}

export default MessageController;
