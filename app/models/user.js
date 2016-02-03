// Load required packages
var mongoose = require('mongoose');

// Define user schema
var UserSchema = new mongoose.Schema({
    first_name: {
    	type: String,
    	required: true
    },
    last_name: {
    	type: String,
    	required: true
    },
    password: {
    	type: String,
    	required: true,
    	default: "1234"
    },
    passwordChanged: {
    	type: Boolean,
    	default: false
    },
    role: {
    	type: String,
    	required: true
    },
    email: {
    	type: String,
    	unique: true,
    	required: true
    },
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);