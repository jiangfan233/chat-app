const Message = require("../model/MessageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const message = req.body;
    const doc = await Message.create({
      message: {
        text: message.msg,
        users: {
          from: message.fromId,
          to: message.toId,
        },
      },
    });
    if (doc.createdAt) {
      return res.json({ status: true, msg: "Send message successfully!" });
    } else {
      return res.json({ status: false, msg: "Send message failed!" });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.allMessages = async (req, res, next) => {
  try {
    const { fromId, toId } = req.body;
    Message.find({
      $or: [
        {
          $and: [
            {
              "message.users.to": toId,
            },
            {
              "message.users.from": fromId,
            },
          ],
        },
        {
          $and: [
            {
              "message.users.to": fromId,
            },
            {
              "message.users.from": toId,
            },
          ],
        },
      ],
    })
      .limit(10)
      .sort({ createdAt: "desc" })
      .exec((err, doc) =>
        err
          ? res.json({ status: false, msg: "Error getting history messages!" })
          : res.json({ status: true, messageList: doc })
      );
  } catch (ex) {
    next(ex);
  }
};
