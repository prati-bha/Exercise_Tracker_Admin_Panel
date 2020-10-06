const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/username').get((req, res) => {
    const username = req.query.username;
    User.find({
        "username": username,
    }, (err, user) => {
        if (err) {
            res.status(400).json('Error: ' + err)
        }
        if (username !== undefined && user.length === 0) {
            res.status(200).send();
        }
        if (user.length > 0) {
            res.status(405).send({
                message: "username already taken"
            });
        }
        if (username === undefined) {
            res.status(400).send({
                message: 'username required'
            });
        }
    })
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;