// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define user schema
var DevelopmentManager = new mongoose.Schema({
    team: [
    	{
	    	type: ObjectId,
	    	ref: 'Resource'
	    }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('DevelopmentManager', DevelopmentManager);