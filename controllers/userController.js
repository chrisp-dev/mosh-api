const db = require('../models');

module.exports = {
    // GET route for getting all of the users
    // route: /api/users
    allUsers: function (req, res) {
        db.User.findAll({}).then(function (dbUser) {
            res.json(dbUser);
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    },
    // Get route for retrieving a single user
    // route: /api/user/:id
    singleUser: function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    },
    // POST route for saving a new user
    // route: /api/user/new
    newUser: function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
            
        })
            .then(function (data) {
                // return data
                res.json(data);
            }).catch(function (err) {
                console.error(err);
            })
    },
    // DELETE route for deleting user
    // Route: /api/user/:id
    deleteUser: function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    },
    // PUT route for updating user
    // route: /api/user/:id
    updateUser: function (req, res) {
        db.User.update(
            req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            console.error(err);
        });
    }
}