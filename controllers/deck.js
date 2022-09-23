/*
*  We can interact with mongoose in three different ways:
* [x] callback
* [x] Promises
* [x] Async/Await ( Promises )
*/

const User = require('../models/User');
const Deck = require('../models/Deck');

const deleteDeck = async (req, res, next) => {

}

const getDeck = async (req, res, next) => {
    const deck = await Deck.findById(req.value.params.deckID);
    return res.status(200).json({deck});
};

const index = async (req, res, next) => {
    const decks = await Deck.find({});

    return res.status(200).json({decks});
}

const newDeck = async (req, res, next) => {
    // Find owner
    const owner = await User.findById(req.value.body.owner);

    // Create a new deck
    const deck = req.value.body;
    delete deck.owner;

    deck.owner = owner._id;
    const newDeck = new Deck(deck);
    await newDeck.save();

    console.log(owner);
    // Add newly created deck to the actual decks
    owner.decks.push(newDeck._id);
    await owner.save();

    return res.status(201).json({deck: newDeck});
}

const replaceDeck = async (req, res, next) => {
    const { deckID } = req.value.params;

    const newDeck = req.value.body;

    const result = await Deck.findByIdAndUpdate(deckID, newDeck);

    return res.status(200).json({ success: true });
}

const updateDeck = async (req, res, next) => {
    const { deckID } = req.value.params;

    const newDeck = req.value.body;

    const result = await Deck.findByIdAndUpdate(deckID, newDeck);

    return res.status(200).json({ success: true });
}

module.exports = {
    deleteDeck,
    index,
    newDeck,
    getDeck,
    replaceDeck,
    updateDeck
}