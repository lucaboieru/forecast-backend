var UserModel = require('../models/user');

exports.create = function (req, res) {

    // create new user
    var newUser = new UserModel(req.data);

    newUser.save(function (err) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send('ok');
    });
};

exports.show = function (req, res) {

    var uid = req.params.uid;

    // do find
    UserModel.findById(uid, function(err, user) {
        if (err) {
            return res.status(400).send(err)
        }

        res.status(200).send(JSON.stringify(user));
    });
};

exports.index = function (req, res) {

    // do find
    UserModel.find(function(err, users) {
        if (err) {
            return res.status(400).send(err)
        }

        res.status(200).send(JSON.stringify(users));
    });
};
