const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: {
    todo: { type: Object }
    , doing: { type: Object }
    , done: { type: Object }
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User: User };