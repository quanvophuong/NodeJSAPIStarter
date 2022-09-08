/*
*  We can interact with mongoose in three different ways:
* [x] callback
* [x] Promises
* [x] Async/Await ( Promises )
*/

const User = require('../models/User');
const Deck = require('../models/Deck');

const Joi = require('joi');
const idSchema = Joi.object().keys({
    userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});

const index = async (req, res, next) => {

    const users = await User.find({});
    return res.status(200).json(users);

}

const newUser = async (req, res, next) => {

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({user: newUser});
}

const newUserDeck = async (req, res, next) => {
    const { userID } = req.params;

    // Create a new deck
    const newDeck = new Deck(req.body);

    // Get user
    const user = await User.findById(userID);

    // Assign user as a deck's owner
    newDeck.owner = user;

    // Save deck
    await newDeck.save();

    // Add deck to user's decks array 'decks'
    user.decks.push(newDeck._id);

    // Save user
    await user.save();

    return res.status(201).json({ deck: newDeck});

}

const getUser = async (req, res, next) => {
    const { userID } = req.value.params;

    const user = await User.findById(userID);

    return res.status(200).json({user});
}

const getUserDecks = async (req, res, next) => {
    const { userID } = req.params;

    // Get user
    const user = await User.findById(userID).populate('decks');

    return res.status(200).json({decks: user.decks});
}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.params;

    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userID, newUser);

    return res.status(200).json({ success: true });

}

const updateUser = async (req, res, next) => {
    // number of fields
    const { userID } = req.params;

    const newUser = req.body;

    const result = await User.findByIdAndUpdate(userID, newUser);

    return res.status(200).json({ success: true });
}

module.exports = {
    index,
    newUser,
    newUserDeck,
    getUser,
    getUserDecks,
    replaceUser,
    updateUser
}