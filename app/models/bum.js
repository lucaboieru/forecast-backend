// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define user schema
var BusinessUnitManager = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "business_unit_manager"
    }
});

// Export the Mongoose model
module.exports = mongoose.model('BusinessUnitManager', BusinessUnitManager);