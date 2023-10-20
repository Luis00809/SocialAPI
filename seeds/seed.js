const { User, Thought, Reaction } = require('../models');
const connection = require('../config/connection');

const users = require('./User-seeds');
const thoughts = require('./Thought-seeds');
const reactions = require('./Reaction-seeds');

const mongoose = require('mongoose');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    };


    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    };

    let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
    if (reactionCheck.length) {
        await connection.dropCollection('reactions');
    };

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
    await Reaction.collection.insertMany(reactions);


    console.table(users);
    console.table(thoughts);
    console.table(reactions);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});