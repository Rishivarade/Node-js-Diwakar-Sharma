const express = require("express");
const fs = require("fs");
// Middleware to add ID to heroes

const addID = (req, res, next) => {
  const dbPath = "./db.json";
  
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Failed to read database" });
    }
    const jsonData = JSON.parse(data);
    const newHeroId = jsonData.heroes.length > 0 ? jsonData.heroes[jsonData.heroes.length - 1].id + 1 : 1;
    req.body.id = newHeroId;
    next();
  });
};
module.exports=addID