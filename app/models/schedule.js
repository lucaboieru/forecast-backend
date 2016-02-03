// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define resource schema
var ScheduleSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    resource_id: {
        type: ObjectId,
        ref: 'Resource'
    },
    periods: [
        {
            type: ObjectId,
            ref: 'PeriodModel'
        }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('Schedule', ScheduleSchema);