const express = require("express");
let router = express.Router();
var Product = require("../../models/product.model");
const multer = require("multer");
const userAuth = require("../../middleware/auth.user");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }); //middlewear contains storage obj of file location and name of file

// Get all records
router.get("/",userAuth, async (req, res) => {
  console.log('req.user', req.user);
  let products = await Product.find();
  return res.send(products);
});

// Get a record
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product with given ID is not present");
    return res.send(product);
  } catch (error) {
    return res.status(400).send("Invalid ID");
  }
});
// update a record
router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

//Delete a record
router.delete("/:id", async (req, res) => {
  //id gives only when we need to find somethong
  let product = await Product.findByIdAndDelete(req.params.id);

  return res.send(product);
});
//Insert a record
// router.post("/", async (req, res) => {
router.post("/",upload.single("file"), async (req, res) => {
  console.log("req.body", req.body);
  // console.log("file", req.file);
  let product = new Product();
  product.name = req.body.name;
  if (req.file) {
    product.img = "http://localhost:4000/" + req.file.path;
  }
  product.price = req.body.price;
  product.description = req.body.description;
  await product.save();
  return res.send(product);
});

module.exports = router;
