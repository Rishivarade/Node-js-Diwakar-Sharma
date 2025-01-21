const express = require("express");
const fs = require("fs"); // Use fs module
const addID = require("./middlewares/addID.middleware");
const logger = require("./middlewares/logger.middleware");
const auth = require("./middlewares/auth.middleware");
const dotenv=require('dotenv')
dotenv.config()
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const dbPath = "./db.json";


// Endpoint to add a new hero
app.post("/add/hero", addID, (req, res) => {
  const newHero = req.body;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Failed to read database" });
    }
    const jsonData = JSON.parse(data);
    jsonData.heroes.push(newHero);
    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(400).json({ error: "Failed to save new hero" });
      }
      res.status(200).json(jsonData.heroes);
    });
  });
});

// Endpoint to retrieve all heroes
app.get("/heroes", logger, (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Failed to read database" });
    }
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData.heroes);
  });
});

// Endpoint to update villain for a hero
app.patch("/update/villain/:hero_id", auth, (req, res) => {
  const heroId = parseInt(req.params.hero_id);
  const newVillain = req.body;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Failed to read database" });
    }
    const jsonData = JSON.parse(data);
    const hero = jsonData.heroes.find((h) => h.id === heroId);
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    hero.villains.push(newVillain);
    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(400).json({ error: "Failed to save updated hero" });
      }
      res.status(200).json(hero);
    });
  });
});

// Endpoint to delete a hero
app.delete("/delete/hero/:hero_id", auth, (req, res) => {
  const heroId = parseInt(req.params.hero_id);

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Failed to read database" });
    }
    const jsonData = JSON.parse(data);
    const heroIndex = jsonData.heroes.findIndex((h) => h.id === heroId);
    if (heroIndex === -1) {
      return res.status(400).json({ message: "Hero not found" });
    }
    jsonData.heroes.splice(heroIndex, 1);
    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(400).json({ error: "Failed to save changes" });
      }
      res.status(200).json(jsonData.heroes);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
