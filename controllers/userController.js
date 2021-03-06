const {User} = require("../models/");

//Get all users
async function getAllUsers(req, res) {
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

//Delete user
async function deleteUser(req, res) {
    try {
        const toBeDeletedUser = await User.findOne(
            {_id: req.params.userId},
        ); 
            console.log("User object: " + toBeDeletedUser);
        if(toBeDeletedUser) {
                toBeDeletedUser.thoughts = [];
            await User.findOneAndDelete(
                {_id: req.params.userId}
            ); 
            res.json({message: "User deleted!"});
        }
        else {
            res.status(404).json({message: "User not found!"})
        }
    } catch (error) {
       res.status(500).json(error);
       console.log(error); 
    }
}

//Add friend 
async function addFriend(req, res) {
    try {
        const currentUser = await User.findOne(
            {_id: req.params.userId}
        );
        const friendUser = await User.findOne(
            {_id: req.params.friendId}
        )
    
        if(currentUser && friendUser) {
            const ourUser = await User.findOneAndUpdate(
                {_id: req.params.id},
                { $push: { friends: friendUser._id } },
                { runValidators: true, new: true }
            );
            res.json({message: "Friend Added!"})
        }
        else {
            res.status(404).json({message: "User of Friend not found!"})
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//Remove friend
async function removeFriend(req, res) {
    try {
        const friendRemove = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          );
          if(friendRemove) {
              res.json({message: "Friend removed!"})
          }
          else {
              res.status(404).json({message: "Friend or user not found!"});
          }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}


module.exports = {getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend};