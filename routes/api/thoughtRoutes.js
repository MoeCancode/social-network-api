const express = require("express");
const router = express.Router();

//Import functions made for users
const thoughtfunctions = require("../../controllers/thoughtController");

// methods for /api/thoughts
router.route('/').get(thoughtfunctions.getAllThoughts).post(thoughtfunctions.createThought);

//methods for /api/thougt/thoughtId
router.route('/:thoughtId')
  .get(thoughtfunctions.getOneThought)
  .put(thoughtfunctions.updateThought)
  .delete(thoughtfunctions.deleteThought);

//methods for /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(thoughtfunctions.reactToThought);

//methods for /api/thoughts/thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(thoughtfunctions.removeReaction);

module.exports = router;