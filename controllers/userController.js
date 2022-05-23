const {User, Thought} = require("../models/");

//Get all users
async function getAllUsers() {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//Get User by ID
async function getOneUser(req, res) {
    try {
        const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v');
        if(singleUser) {
            res.json(singleUser);
        }
        else {
            res.status(404).json({message: "User not found!"});
        }
            
    } catch (error) {
        res.status(500);
        console.log(error);
    } 
}

//Create new user
async function createUser(req, res) {
    try {
        const newUser= await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
        
    }
}

//update a user
async function updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        if(updatedUser) {
            res.json(updatedUser);
        }
        else {
            res.status(404).json({message: "User not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

module.exports = {getAllUsers, getOneUser, createUser, updateUser};