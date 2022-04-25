// require user model
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
};
