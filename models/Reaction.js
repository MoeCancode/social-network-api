const mongoose = require("mongoose");
const { format } = require("path");

const reactionSchema = new mongoose.Schema(
{
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => format(timestamp)
  }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
);

//Date formatting function
function format(time) {
    const date = new Date(time);
    return date.toDateString();
}

module.exports = reactionSchema;