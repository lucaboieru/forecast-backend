// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define resource schema
var ScheduleSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    periods: [
        {
            type: ObjectId,
            ref: 'Period'
        }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('Schedule', ScheduleSchema);