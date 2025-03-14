const mongoose = require('mongoose');

// Define the UserSalt schema
const UserSaltSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

// Export the UserSalt model
module.exports = mongoose.model('UserSalt', UserSaltSchema);