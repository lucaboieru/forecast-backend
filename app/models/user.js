// Load required packages
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

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
    password_changed: {
    	type: Boolean,
    	default: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
    	bum: {
            type: ObjectId,
            ref: 'BusinessUnitManager'
        },
        devman: {
            type: ObjectId,
            ref: 'DevelopmentManager'
        }
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);