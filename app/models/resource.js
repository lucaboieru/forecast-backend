// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define resource schema
var ResourceSchema = new mongoose.Schema({
    resource_id: {
    	type: String,
    	required: true
    },
    skills: [
        {
            type: ObjectId,
            ref: 'Skill',
            required: true
        },
    ],
    schedule: [
        {
            type: ObjectId,
            ref: 'Schedule'
        }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('Resource', ResourceSchema);