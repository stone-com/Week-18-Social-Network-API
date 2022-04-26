// require express router
const router = require('express').Router();
// require all thought controller functions
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// GET and POST routes for /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// GEt one, PUT, DELETE routes for /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// POST and DELETE routes to create and delete reactions. /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

// export
module.exports = router;
