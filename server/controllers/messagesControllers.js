const Message = require("../model/MessageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const message = req.body;
    console.log(message);
    const doc = await Message.create({
      message: {
        text: message.msg,
        users: {
          from: message.fromId,
          to: message.toId,
        },
      },
    });
    console.log(doc.createdAt);
    if (doc.createdAt) {
      return res.json({ status: true, msg: "Send message successfully!" });
    } else {
      return res.json({ status: false, msg: "Send message failed!" });
    }
  } catch (ex) {
    next(ex);
  }
};
