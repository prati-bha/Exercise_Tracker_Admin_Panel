const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/username').get((req, res) => {
    const username = req.query.username;
    User.find()
        .then(users => {
            let isUnique;
            const usedUsernames = users.filter((user) => {
                if (username.toLowerCase() === user.username.toLowerCase()) {
                    return user
                }
            });
            if (usedUsernames.length > 0) {
                isUnique = false
            } else {
                isUnique = true
            }
            if (username !== undefined && isUnique) {
                res.status(200).send({
                    message: "username can be taken !"
                });
            }
            if (!isUnique) {
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
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;