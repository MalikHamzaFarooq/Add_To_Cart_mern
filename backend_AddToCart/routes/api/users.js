const express = require("express");
let router = express.Router();
var User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var app = express();


app.use(cookieParser())





// Get all records
router.get("/", async (req, res) => {
  let users = await User.find();
  return res.send(users);
});

// update a record
router.put("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.dob = req.body.dob;
  user.password = req.body.password;
  await user.save();
});

//Delete a record
router.delete("/:id", async (req, res) => {
  //id gives only when we need to find somethong
  let user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});
//Insert a record

// router.post("/", async (req, res) => {
router.post("/", async (req, res) => {
  console.log("req.body", req.body)
 
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.dob = req.body.dob;
  user.password = await bcrypt.hash(req.body.password,10);
  await user.save();
  return res.send(user);
});

module.exports = router;
