// Load required packages
var mongoose = require('mongoose');

// Define user schema
var SkillSetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('SkillSet', SkillSetSchema);