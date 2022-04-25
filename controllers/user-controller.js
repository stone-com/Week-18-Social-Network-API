// require user model
const res = require('express/lib/response');
const { User } = require('../models');

// initiate the user controller

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((results) => res.json(results))
      .catch((err) => res.status(500).json(err));
  },
  // get one user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((results) => {
        // if no data found, set status to 404 and respond with message
        if (!results) {
          res.status(404).json({
            message:
              'No user with that ID found, try again with different ID please.',
          });
          return;
        }
        // else, respond with results
        res.json(results);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((results) => res.json(results))
      .catch((err) => res.status(400).json(err));
  },
  // update a user by their ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((results) => {
        // if no results found, set status to 404 and respond with message
        if (!results) {
          res
            .status(404)
            .json({ message: 'No user with that ID found, try again!' });
          return;
        }
        // else, respond with results
        res.json(results);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete a user by their ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((results) => {
        // if no user with that ID found, set status to 404 and respond with message
        if (!results) {
          res
            .status(404)
            .json({ message: 'No user with that ID found, try again' });
          return;
        }
        // else, respond with results
        res.json(results);
      })
      .catch((err) => res.status(400).json(err));
  },
  // add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((results) => res.status(200).json(results))
      .catch((err) => res.status(400).json(err));
  },
  // delete a friend
  removeFriend({ params }, res) {
    //    use findoneand update rather than findoneanddelete, because we need to remove the friend from the User model instead of just deleting the friend
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((results) => {
        // if no results, set status to 404 and reply with message
        if (!results) {
          res
            .status(404)
            .json({ message: 'No results found with that ID, try again' });
          return;
        }
        // else, respond with results
        res.json(results);
      })
      .catch((err) => res.status(400).json(err));
  },
};

// export
module.exports = userController;
