const mongoose = require("mongoose");
const reactionBlueprint = require("./Reaction");

const thoughtSchema = mongoose.Schema(
{
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => format(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionBlueprint]
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

thoughtSchema.virtual("reactionCount").get(function() {
    const totalReacts = this.reactions.length;
    return totalReacts;
});

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;