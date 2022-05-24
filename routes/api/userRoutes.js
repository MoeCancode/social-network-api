const express = require("express");
const router = express.Router();

//Import functions made for users
const userfunctions = require("../../controllers/userController");

// methods for /api/users
router.route('/').get(userfunctions.getAllUsers).post(userfunctions.createUser);

//methods for /api/users/:userId
router.route('/:userId').get(userfunctions.getOneUser).put(userfunctions.updateUser).delete(userfunctions.deleteUser);

//methods for /api/users/:userId/friends
router.route('/:userId/friends').post(userfunctions.addFriend);

//Methods for /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').delete(userfunctions.removeFriend);

module.exports = router;