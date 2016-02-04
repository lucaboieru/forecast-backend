var request = require('request');
var api_uri = "http://52.20.76.156:8888/api/";

var ResourceModel = require('../models/resource');
var UserModel = require('../models/user');
var DevelopmentManagerModel = require('../models/devman');

exports.index = function (req, res) {

    DevelopmentManagerModel
    .findById(req.params.role_id)
    .populate("team.skills")
    .populate("team.schedule")
    .exec(function (err, resources) {

        if (err) {
            return res.status(400).send(err);
        }

        // get projects from api
        request({
            method: 'GET',
            uri: api_uri + 'grouped_projects'
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                // merge projects into resources
                for (var i = 0, l = resources.length; i < l; ++ i) {
                    (function (i) {
                        var schedule = resources[i].schedule;

                        request({
                            method: 'GET',
                            uri: api_uri + 'resources/' + resources[i].resource_id
                        }, function (error, response, body) {
                            body = JSON.parse(body);
                            resources[i].first_name = body.first_name;
                            resources[i].last_name = body.last_name;
                            resources[i].position = body.position;
                            resources[i].hours = body.hours;
                        });

                        for (var j = 0; j < schedule.length; ++ j) {
                            project = body[project];
                        }
                    })(i);
                }

                // everything okay, send the merged response
                res.status(200).send(JSON.stringify(resources));
            } else {
                res.status(500).send(error);
            }
        });
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
