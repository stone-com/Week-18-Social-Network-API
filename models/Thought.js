// require schema model and Types
const { Schema, model, Types } = require('mongoose');

// reactionSchema (will be nested within thoughtschema)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total number of reactions, set to virtual 'reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// create thought model from the schema
const Thought = model('Thought', thoughtSchema);

// export
module.exports = Thought;
