var express = require('express');
var router = express.Router();
var { Book } = require("../models");

//Shows all the boks
router.get("/", async (req, res) => {
  const books = await Book.findAll({ order: [["year", "ASC"]]})
  res.render("index", { books })
});

//Shows the create a new book form
router.get("/new", (req, res) => {
  res.render("new_book")
})

//Post a new book to the data base
router.post("/", async (req, res) => {
  const book = await Book.create(req.body)
  res.redirect("/")
})

//Show books detail form
router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  res.render("book_detail", { book, tile: "Update Book"})
})


//updates a book's info to the database
router.post("/:id", async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body)
  res.redirect("/")
})

//Delet a book from the database this step can not be undone
router.post("/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect("/")
})

module.exports = router;
