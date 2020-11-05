const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

function capitalizeFirstLetter(v) {
  return v.charAt(0).toUpperCase() + v.substr(1);
}

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    immutable: true,
    trim: true,
  },

  creator: { type: Schema.Types.ObjectId, immutable: true },
  type: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  firstname: { type: String, get: capitalizeFirstLetter },
  lastname: { type: String, get: capitalizeFirstLetter },
  password: { type: String, select: false },
});

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model("user", userSchema);
module.exports = ModelClass;
