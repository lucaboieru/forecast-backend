// Load required packages
var mongoose = require('mongoose');

// Define user schema
var PeriodSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    offset_top: {
        type: Number,
        required: true,
        default: 0
    },
    hours: {
        type: Number,
        required: true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Period', PeriodSchema);