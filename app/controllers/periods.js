var request = require('request');

var ResourceModel = require('../models/resource.js');
var PeriodModel = require('../models/period.js');
var ScheduleModel = require('../models/schedule.js');

exports.index = function (req, res) {
    ScheduleModel.find(function (err, periods) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(periods));
    });
};

exports.create = function (req, res) {

    var pid = req.body.pid;
    var rid = req.body.rid;

    // create period
    var newPeriod = new PeriodModel(req.body.period);

    newPeriod.save(function (err, period) {
        if (err) {
            return res.status(400).send(err);
        }

        var periodId = period._id;

        var crudObj = {
            q: {
                resource_id: rid,
                project: pid
            },
            u: {
                resource_id: rid,
                project: pid,
                $push: {
                    periods: periodId
                }
            },
            o: {
                upsert: true
            }
        };

        // upsert schedule model
        ScheduleModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, update) {
            console.log(update);

            // update resource model
            var crudObj = {
                q: {
                    _id: rid,
                },
                u: {
                    $addToSet: {
                        schedule: update._id
                    }
                }
            };

            ResourceModel.update(crudObj.q, crudObj.u, function (err, update) {
                res.status(200).send(JSON.stringify(update));
            });
        });
    });
};

exports.show = function (req, res) {
    var pid = req.params.pid;

    PeriodModel.findById(rid, function (err, resources) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(resources));
    });
};

exports.remove = function (req, res) {
    var pid = req.params.pid;

    PeriodModel.remove({_id: pid}, function (err, removed) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(removed));
    });
};

exports.update = function (req, res) {

	var pid = req.params.pid;

    var crudObj = {
        q: {
            _id: pid
        },
        o: req.body
    };

    PeriodModel.findOneAndUpdate(crudObj.q, crudObj.o, function (err, place) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(place));
    });
};
