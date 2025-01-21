const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const contactController = require("../controllers/contactController");

// Home Route
router.get("/", (req, res) => res.render("home"));

// About Route
router.get("/about", (req, res) => res.render("about"));

// Contact Routes
router.get("/contact", (req, res) => res.render("contact"));
router.post("/contact", contactController.saveContact);

// Products Route
router.get("/products", productController.getProducts);

module.exports = router;
