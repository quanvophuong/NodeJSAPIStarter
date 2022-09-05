/*
*  We can interact with mongoose in three different ways:
* [x] callback
* [x] Promises
* [x] Async/Await ( Promises )
*/

const User = require('../models/User');

const index = async (req, res, next) => {
    try {

        const users = await User.find({});
        return res.status(201).json(users);

    } catch (error){
        next(error);
    }

}

const newUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json({user: newUser});
    } catch (err){
        next(err);
    }

}

module.exports = {
    index,
    newUser
}