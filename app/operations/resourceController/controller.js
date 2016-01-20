var mongo = require("../../lib/mongo");
var ObjectId = mongo.ObjectID;

exports.index = function (source) {

	source.res.setHeader('Access-Control-Allow-Origin', '*');
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("resources", function (err, col) {

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

	var resourceData = source.data;

	source.res.setHeader('Access-Control-Allow-Origin', '*');
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("resources", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // insert new resource
            col.insert({name: resourceData.name}, function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}
          		
            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};

exports.show = function (source) {

	var rid = source.req.params.rid;

	source.res.setHeader('Access-Control-Allow-Origin', '*');
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("resources", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // insert new resource
            col.findOne({_id: ObjectId(rid)}, function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}
          		
            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};

exports.destroy = function (source) {

	var rid = source.req.params.rid;

	source.res.setHeader('Access-Control-Allow-Origin', '*');
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("resources", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // insert new resource
            col.remove({_id: ObjectId(rid)}, function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}
          		
            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};

exports.update = function (source) {

	var rid = source.req.params.rid;
	var resourceData = source.data;
	resourceData._id = ObjectId(rid);

	source.res.setHeader('Access-Control-Allow-Origin', '*');
    
    // fetch db object
    mongo.connect("forecast", function (err, db) {

        // handle error
        if (err) {
            return source.res.status(500).send(JSON.stringify(err));
        }

        // fetch collection
        db.collection("resources", function (err, col) {

            // handle error
            if (err) {
                return source.res.status(500).send(JSON.stringify(err));
            }

            // insert new resource
            col.update({_id: ObjectId(rid)}, {$set: resourceData}, function (err, data) {

          		if (err) {
          			return source.res.status(500).send(JSON.stringify(err));
          		}
          		
            	source.res.status(200).send(JSON.stringify(data));
            });
        });
    });
};
