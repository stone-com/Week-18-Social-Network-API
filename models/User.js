// require Schema and Model from Mongoose
const { Schema, model } = require('mongoose');

// user Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Enter a valid Email Address',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
      getters: true,
    },
    id: false,
  }
);

// get total number of friends and save to virtual 'friendcount

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// create the user model from the schema
const User = model('User', userSchema);

// export
module.exports = User;