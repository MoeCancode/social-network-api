const { User, Thought } = require('../models');
const {users, thoughts} = require('./data');
const connection = require('../config/connection');

connection.once('open', async () => {
    console.log('Database connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
    await User.insertMany(users);
    await Thought.insertMany(thoughts);
});

console.table(users);
console.log("---------------------------------------------------");
console.table(thoughts);