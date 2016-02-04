// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define user schema
var DevelopmentManager = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "development_manager"
    },
    team: [
    	{
	    	type: ObjectId,
	    	ref: 'Resources'
	    }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('DevelopmentManager', DevelopmentManager);