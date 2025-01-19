require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    // required: true,
  },

  lastName: {
    type: String,
    // required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
  },

  birthdate: {
    type: Date,
  },

  gender: {
    type: String,
  },

  profileImage: {
    type: String,
    default: "/src/assets/images/profile-01.png",
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Secure the password with bcrypt
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//compare the password

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//create json web token

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const USER = mongoose.model("User", UserSchema);

module.exports = USER;
