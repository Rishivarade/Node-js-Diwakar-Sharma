const express = require("express");
const {
  getBooks,
  updateBook,
  deleteBook,
  addBook,
  getBookWithId,
} = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/getBooks", getBooks);
bookRouter.get("/getBookById/:id", getBookWithId);
bookRouter.post("/addBook", addBook);
bookRouter.put("/updateBook/:id", updateBook);
bookRouter.delete("/deleteBook/:id", deleteBook);

module.exports = bookRouter;
