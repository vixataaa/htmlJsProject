var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    // Register
    router.post('/', function(req, res) {
        console.log(req.body);

        const users = db.get('users');

        const userToRegister = req.body;

        const foundUser = users.find({
            username : userToRegister.username
        }).value();


        if(foundUser) {
            res.status(401)
                .json('User with that username exists.');
            return;
        }

        users.insert(userToRegister)
            .write();            

        res.json({
            username : userToRegister.username,
            userId: userToRegister.id
        });
    });

    // Auth
    router.put('/', function(req, res) {
        const users = db.get('users');

        const userToAuth = req.body;

        const foundUser = users.find({
            username : userToAuth.username
        }).value();

        if(!foundUser) {
            res.status(401)
                .json('User with that name does not exist.');
            return;
        }

        if(foundUser.passHash !== userToAuth.passHash) {
            res.status(401)
                .json('Incorrect password');
            return;
        }

        res.json({
            username : foundUser.username,
            userId : foundUser.id
        });
    });

    return router;
};