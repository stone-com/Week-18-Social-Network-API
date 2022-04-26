// require express router
const router = require('express').Router();
// require all user controller functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// GET and POST routes for /api/users
router.route('/').get(getAllUsers).post(createUser);

// GET one, PUT, and DELETE rutes for /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// add and delete friends routes (POST/DELETE) for /api/users/:id/friends/:friendsId
router.route('/:id/friends/:friendsId').post(addFriend).delete(deleteFriend);

module.exports = router;