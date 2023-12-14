var mongoose =require("mongoose");

var productSchema = mongoose.Schema({
    name: {type : String, required : true},
    img: {type : String},
    description :String,
    price:{type:Number},
});

var Product = mongoose.model("Product",productSchema);

module.exports = Product;