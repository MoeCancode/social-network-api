const mongoose = require("mongoose");

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
      //Add getter method here
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

module.exports = reactionSchema;