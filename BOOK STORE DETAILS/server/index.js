const express = require("express");
const cors = require("cors");
const connectwithdb = require("./db/db");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
// CONNECT with db
connectwithdb();

// use Route
const bookRoutes = require("./routes/bookRoutes");
app.use("/book", bookRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
