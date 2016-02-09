var ResourceModel = require('../models/resource');
var SkillModel = require('../models/skill');
var SkillSetModel = require('../models/skillset');

exports.getSkillSet = function (req, res) {
    SkillSetModel.find(function (err, skills) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(skills);
    });
};

exports.addToSkillSet = function (req, res) {

    var newSkill = new SkillSetModel(req.body);

    newSkill.save(function (err, doc) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(doc);
    });
};

exports.create = function (req, res) {

    var rid = req.body.resource_id;
    var sid = req.body.skill_id;
    var level = req.body.level;

    var newResourceSkill = new SkillModel({
        skill: sid,
        level: level
    });

    // create new resource skill
    newResourceSkill.save(function (err, skill) {
        if (err) {
            return res.status(400).send(err);
        }

        // add to resource array
        var crudObj = {
            q: {
                _id: rid
            },
            u: {
                $addToSet: {
                    skills: skill._id
                }
            },
            o: {
                new: true
            }
        };

        ResourceModel.findOneAndUpdate(crudObj.q, crudObj.u, function (err, update) {
            if (err) {
                return res.status(400).send(err);
            }

            res.status(200).send(update);
        });
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
