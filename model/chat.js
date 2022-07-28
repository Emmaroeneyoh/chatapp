const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blog_schema = new schema({
  chat: {
    type: String,
  },
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
  },
  member: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rant",
  },
});

const user_model = mongoose.model("chat", blog_schema);

module.exports = user_model;
