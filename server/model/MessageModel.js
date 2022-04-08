const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: {
        from: { 
          type: String,
          required: true, 
        },
        to: {
          type: String,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessageSchema);
