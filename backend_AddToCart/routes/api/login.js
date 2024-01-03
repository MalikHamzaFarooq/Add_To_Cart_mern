const express = require("express");
let router = express.Router();
var User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var app = express();
const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
const config = require("config")

app.use(cookieParser());

router.post("/", async (req, res) => {
  console.log("req.body", req.body);

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("user",user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(                                                  //variable that contains our PR key
      { userId: user._id, email: user.email, admin: user.admin },config.get('jwtPrivateKey'),
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token, user }); // Return the token to the client
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); 

module.exports = router;
