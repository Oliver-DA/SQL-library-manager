var express = require('express');
var router = express.Router();
var { Book } = require("../models");

//Async handler
function asyncHandler(cb) {

  return async (req, res, next) => {

    try {
      await cb(req, res, next)

    } catch(error) {
      next(error)
    }

  }
}

//Shows all the boks
router.get("/", asyncHandler(async (req, res) => {

  const books = await Book.findAll({ order: [["year", "ASC"]]})
  res.render("index", { books })

}));

//Shows the create a new book form
router.get("/new", (req, res) => {

  res.render("new_book", { book: {} , title: "New Book"})

})

//Post a new book to the data base
router.post("/new", asyncHandler(async (req, res) => {
  let book;

  try {
    book = await Book.create(req.body)
    res.redirect("/")

  } catch (error) {

    if (error.name == "SequelizeValidationError") {

      book = await Book.build(req.body);
      res.render("new_book", { book, errors: error.errors, title: "New Book"})
      
    } else {
      throw error
    }
  }

}));

//Show books detail form
router.get("/:id", asyncHandler(async (req, res) => {

  const book = await Book.findByPk(req.params.id);
  ( book ) ? res.render("update-book", { book, title: "Update Book"}) : res.sendStatus(404)
  
}));


//updates a book's info to the database
router.post("/:id", async(req, res) => {
  
  let book;

  try {
    book = await Book.findByPk(req.params.id);
    ( book ) ? ( await book.update(req.body), res.redirect("/") ) : res.sendStatus(404)

  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("/:id", { book })
    } else {
      throw error
    }
  }

})

//Delet a book from the database this step can not be undone
router.post("/:id/delete", async (req, res) => {

  const book = await Book.findByPk(req.params.id);
  ( book ) ? ( await book.destroy(), res.redirect("/") ) : res.sendStatus(404)

})

module.exports = router;
