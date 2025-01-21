const Product = require("../models/product");


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching products");
  }
};
