var ResourceModel = require('../models/resource.js');
var PeriodModel = require('../models/period.js');
var ScheduleModel = require('../models/schedule.js');

exports.index = function (req, res) {
    ScheduleModel.find(function (err, schedule) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(schedule));
    });
};

exports.create = function (req, res) {

	// create new user
    var newPeriod = new ScheduleModel(req.body);

    newPeriod.save(function (err, period) {
        if (err) {
            return res.status(400).send(err);
        }

        var periodId = period._id;

        res.status(200).send('ok');
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
    }

    PeriodModel.findOneAndUpdate(crudObj.q, crudObj.o, function (err, place) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(JSON.stringify(place));
    });
};
