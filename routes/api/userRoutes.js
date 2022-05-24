const express = require("express");
const router = express.Router();

const userfunctions = require("../../controllers/userController");

// methods for /api/users
router.route('/').get(userfunctions.getAllUsers).post(userfunctions.createUser);

module.exports = router;