// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// Define user schema
var SkillSchema = new mongoose.Schema({
    skill: {
        type: ObjectId,
        ref: 'SkillSet'
    },
    level: {
    	type: Number,
    	required: true,
    	enum: [1, 2, 3]
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Skill', SkillSchema);