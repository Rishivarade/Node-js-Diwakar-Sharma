const Contact = require("../models/contact");

exports.saveContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.redirect("/contact");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving contact");
  }
};
