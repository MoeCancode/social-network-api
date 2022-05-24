const {Thought, User} = require("../models/");

//Get all thoughts
async function getAllThoughts(req, res) {
    try {
        const allThoughts = await Thought.find();
        res.json(allThoughts);    
    } catch (error) {
        res.status(500).json(error);
        console.log(error);   
    }
}

//Get Thought by Id
async function getOneThought(req, res) {
    try {
        const specificThought = await Thought.findOne(
            {_id: req.params.thoughtId}
        );
        if(specificThought) {
            res.json(specificThought);
        }
        else {
            res.status(404).json({message: "Thought not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//Post/create a thought
async function createThought(req, res) {
    try {
        const newThought = await Thought.create(req.body);
        const thoughtAuthor = User.findOneAndUpdate(
            {_id: req.body.userId},
            { $addToSet: { thoughts: newThought._id } },
            {new: true}
        );
        if(thoughtAuthor) {
            res.json({message: "Thought has been posted!"})
        }
        else {
            res.status(404).json({message: "User not found!"})
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//Update thought
async function updateThought(req, res) {
    try {
        const thoughtToUpdate = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        if(thoughtToUpdate) {
            res.json({message: "Thought has been updated"});
        }
        else {
            res.status(404).json({message: "Thought not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//Delete thought
async function deleteThought(req, res) {
    try {
        const thoughtToDelete = Thought.findOneAndDelete(
            {_id: req.params.ThoughtId}
        );
        if(thoughtToDelete) {
            const thoughtAuthor = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true},
            );
                if(thoughtAuthor) {
                    res.json({message: "Thought deleted"});
                }
                else {
                    res.status(404).json({message: "User not found"});
                }
        }
        else {
            res.status(404).json({message: "Thought not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//React to thought
async function reactToThought(req, res) {
    try {
        const thoughtToReactTo = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body} },
            { runValidators: true, new: true }
        );
        if(thoughtToReactTo) {
            res.json({message: "React added!"});
        }
        else {
            res.status(404).json({message: "Thought not found!"});
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

//remove reaction from thought
async function removeReaction(req, res) {
    try {
        const reactedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: { reactionId: req.params.reactionId }}},
            {runValidators: true, new: true }
        )
        if(reactedThought) {
            res.json({message: "Reaction removed!"});
        }
        else {
            res.status(404).json({message: "Thought not found~"})
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}


module.exports = {getAllThoughts, getOneThought, createThought, updateThought, deleteThought, reactToThought, removeReaction};