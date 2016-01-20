var mongo = require("../../lib/mongo");
var ObjectId = mongo.ObjectID;

exports.index = function (source) {
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("skills", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // find resources
            col.find({}).toArray(function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}

            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};

exports.create = function (source) {

	var skillData = source.data;
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("skills", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // insert new resource
            col.insert(skillData, function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}
          		
            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};
