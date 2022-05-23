const {User, Thought} = require("../models/");

async function getAllUsers() {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

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

async function createUser(req, res) {
    try {
        const newUser= await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
        
    }
}

module.exports = {getAllUsers, getOneUser, createUser}