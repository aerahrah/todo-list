const Users = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    hashPasword = await bcrypt.hash(password, 10);

    const newUser = Users({ username, password: hashPasword });
    newUser.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error signing up:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await Users.findOne({ username });
    if (!userExists) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: userExists._id }, SECRET_KEY);
    return res.status(200).json({ message: "Successfully signed in", token });
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  signup,
  signin,
};
