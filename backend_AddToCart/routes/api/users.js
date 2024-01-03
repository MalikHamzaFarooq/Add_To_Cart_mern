const express = require("express");
let router = express.Router();
var User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const _= require ("lodash");
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
 
  let user = await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).send("User already exists");
  }
  user = new User(); 
  user.name = req.body.name;
  user.email = req.body.email;
  user.dob = req.body.dob;
  user.password = await bcrypt.hash(req.body.password,10);//add salt of random string of 10
  await user.save();
  // return res.send(user);
  return res.send(_.pick(user,["name","email"])); //only name nd mail return in user Obj
});

module.exports = router;
