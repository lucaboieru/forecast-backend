var UserModel = require('../models/user');
var BusinessUnitManagerModel = require('../models/bum');
var DevelopmentManagerModel = require('../models/devman');

exports.create = function (req, res) {

    var userData = req.body;

    // create new user
    if (userData.role === 'development_manager') {

        var newRole = new DevelopmentManagerModel();

        newRole.save(function (err, role) {
            if (err) {
                return res.status(500).send(err);
            }

            userData.role = {};
            userData.role.devman = role._id;
            var newUser = new UserModel(userData);
            newUser.save(function (err, user) {
                if (err) {
                    return res.status(400).send(err);
                }

                res.status(200).send(user);
            });
        });
    } else if (userData.role === 'business_unit_manager') {
        var newRole = new BusinessUnitManagerModel();

        newRole.save(function (err, role) {
            if (err) {
                return res.status(500).send(err);
            }

            userData.role = {};
            userData.role.bum = role._id;
            var newUser = new UserModel(userData);
            newUser.save(function (err, user) {
                if (err) {
                    return res.status(400).send(err);
                }

                res.status(200).send(user);
            });
        });
    }
};

exports.show = function (req, res) {

    var uid = req.params.uid;

    // do find
    UserModel.findById(uid).populate("role.bum").populate("role.devman").exec(function(err, user) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(user);
    });
};

exports.index = function (req, res) {

    // do find
    UserModel.find({}, {password: false}).populate("role.bum").populate("role.devman").exec(function(err, users) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(users);
    });
};

exports.login = function (req, res) {

    var crudObj = {
        q: {
            email: req.body.email,
            password: req.body.password
        },
        o: {
            password: false
        }
    };

    UserModel.findOne(crudObj.q, crudObj.o, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }

        if (!user) {
            return res.status(404).send(err);
        }

        if (user.role.hasOwnProperty("devman")) {
            user.role.name = "development_manager";
        } else if (user.role.hasOwnProperty("bum")) {
            user.role.name = "business_unit_manager";
        }

        res.status(200).send(user);
    });
};
