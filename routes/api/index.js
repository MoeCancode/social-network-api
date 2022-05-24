const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
//require thought routes here

router.use('/users', userRoutes);
//Use thought routes here

module.exports = router;