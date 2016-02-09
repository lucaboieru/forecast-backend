var request = require('request');

var ResourceModel = require('../models/resource.js');
var PeriodModel = require('../models/period.js');
var ScheduleModel = require('../models/schedule.js');

exports.index = function (req, res) {
    ScheduleModel.find()
    .populate("project periods").exec(function (err, periods) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(periods);
    });
};

exports.create = function (req, res) {

    var pid = req.body.project_id;
    var rid = req.body.resource_id;

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
                upsert: true,
                new: true
            }
        };

        // upsert schedule model
        ScheduleModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, update) {
            if (err) {
                return res.status(400).send(err);
            }

            var scheduleId = update._id;

            // update resource model
            var crudObj = {
                q: {
                    _id: rid,
                },
                u: {
                    $addToSet: {
                        schedule: update._id
                    }
                },
                o: {
                    new: true
                }
            };

            ResourceModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, update) {
                res.status(200).send({
                    schedule_id: scheduleId,
                    period_id: periodId
                });
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

        res.status(200).send(resources);
    });
};

exports.remove = function (req, res) {
    var pid = req.params.pid;
    var scheduleId = req.params.sid;

    var crudObj = {
        q: {
            _id: pid
        }
    };

    PeriodModel.remove(crudObj.q, function (err, remove) {
        if (err) {
            return res.status(400).send(err);
        }

        var crudObj = {
            q: {
                _id: scheduleId
            },
            u: {
                $pull: { periods: pid }
            },
            o: {
                new: true
            }
        };

        ScheduleModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, update) {
            if (err) {
                return res.status(400).send(err);
            }

            if (!update || !update.periods || !update.periods.length) {
                ScheduleModel.remove({_id: scheduleId}, function (err, remove) {
                    if (err) {
                        return res.status(400).send(err);
                    }

                    var resourceId = remove.resource_id;

                    var crudObj = {
                        q: {
                            _id: resourceId
                        },
                        u: {
                            $pull: { schedule: remove._id }
                        },
                        o: {
                            new: true
                        }
                    };

                    ResourceModel.update(crudObj.q, crudObj.u, crudObj.o, function (err, update) {
                        if (err) {
                            return res.status(400).send(err);
                        }
                        res.status(200).send();
                    });
                });
            } else {
                res.status(200).send();
            }
        });
    });
};

exports.update = function (req, res) {

	var pid = req.params.pid;

    var crudObj = {
        q: {
            _id: pid
        },
        u: req.body,
        o: {
            new: true
        }
    };

    PeriodModel.findOneAndUpdate(crudObj.q, crudObj.u, crudObj.o, function (err, place) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(place);
    });
};
