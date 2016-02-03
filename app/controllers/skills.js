var SkillModel = require('../models/skill');

exports.create = function (req, res) {

    // create new user
    var newSkill = new SkillModel(req.body);

    newSkill.save(function (err) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send('ok');
    });
};

exports.show = function (req, res) {

    // do find
    SkillModel.find(function(err, skill) {
        if (err) {
            return res.status(400).send(err)
        }

        res.status(200).send(JSON.stringify(skill));
    });
};

exports.index = function (req, res) {

    // do find
    SkillModel.find(function(err, skill) {
        if (err) {
            return res.status(400).send(err)
        }

        res.status(200).send(JSON.stringify(skill));
    });
};

exports.remove = function (req, res) {
    var sid = req.params.sid;

    SkillModel.remove({_id: sid}, function (err, removed) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(removed));
    });
};

exports.update = function (req, res) {

    var sid = req.params.sid;

    var crudObj = {
        q: {
            _id: sid
        },
        o: req.body
    }

    SkillModel.findOneAndUpdate(crudObj.q, crudObj.o, function (err, place) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(place));
    });
};
