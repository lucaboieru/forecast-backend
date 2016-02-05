var request = require('request');
var api_uri = "http://52.20.76.156:8888/api/";

var ResourceModel = require('../models/resource');
var UserModel = require('../models/user');
var DevelopmentManagerModel = require('../models/devman');

exports.getTeam = function (req, res) {

    DevelopmentManagerModel
    .findById(req.params.role_id)
    .populate("team")
    .exec(function (err, roleObj) {

        if (err) {
            return res.status(400).send(err);
        }

        roleObj = roleObj.toObject();

        res.status(200).send(roleObj);
    });
};

exports.addToTeam = function (req, res) {

	// create new user
    var newResource = new ResourceModel(req.body);

    newResource.save(function (err, resource) {
        if (err) {
            return res.status(400).send(err);
        }

        var crudObj = {
            q: {
                _id: req.params.role_id
            },
            u: {
                $addToSet: {team: resource._id}
            },
            o: {
                upsert: true
            }
        };

        DevelopmentManagerModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, resource) {

            if (err) {
                return res.status(500).send(err);
            }

            res.status(200).send('ok');
        });
    });
};

exports.removeFromTeam = function (req, res) {

    var params = req.params;

    ResourceModel.findOneAndRemove({
        resource_id: params.resource_id
    }, function (err, removed) {

        if (err) {
            return res.status(500).send(err);
        }

        var crudObj = {
            q: {
                _id: params.role_id
            },
            u: {
                $pull: {
                    team: removed._id
                }
            }
        };

        DevelopmentManagerModel.update(crudObj.q, crudObj.u, function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.status(200).send("ok");
        });
    });
};

exports.index = function (req, res) {

    DevelopmentManagerModel
    .findOne({_id: req.params.role_id})
    .populate("team")
    .exec(function (err, resources) {

        if (err) {
            return res.status(400).send(err);
        }

        if (!resources) {
            return res.status(404).send();
        }

        var team = resources.toObject();
        team = team.team;

        if (!team) {
            return res.status(200).send(null);
        }

        // get projects from api
        request({
            method: 'GET',
            uri: api_uri + 'grouped_projects'
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                body = JSON.parse(body);

                var queue = [];

                // merge projects into resources
                for (var i = 0, l = team.length; i < l; ++ i) {
                    (function (i) {
                        var schedule = team[i].schedule;

                        for (var j = 0; j < schedule.length; ++ j) {
                            project = body[project];
                        }

                        request({
                            method: 'GET',
                            uri: api_uri + 'resources/' + team[i].resource_id
                        }, function (error, response, body) {
                            body = JSON.parse(body);

                            if (!body) {
                                return;
                            }

                            team[i].first_name = body.first_name;
                            team[i].last_name = body.last_name;
                            team[i].position = body.position;
                            team[i].hours = body.hours;

                            queue.push("@");

                            if (queue.length === team.length) {
                                // everything okay, send the merged response
                                res.status(200).send(team);
                            }
                        });
                    })(i);
                }
            } else {
                res.status(500).send(error);
            }
        });
    });
};

exports.show = function (req, res) {
    var rid = req.params.rid;

    ResourceModel.findById(rid).populate("skills").exec(function (err, resources) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(resources));
    });
};

exports.remove = function (req, res) {
    var rid = req.params.rid;

    ResourceModel.remove({_id: rid}, function (err, removed) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(removed));
    });
};

exports.update = function (req, res) {

	var rid = req.params.rid;

    var crudObj = {
        q: {
            _id: rid
        },
        o: req.body
    }

    ResourceModel.findOneAndUpdate(crudObj.q, crudObj.o, function (err, place) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(place));
    });
};
