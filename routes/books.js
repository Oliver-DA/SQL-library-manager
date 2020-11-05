var express = require('express');
var router = express.Router();
//DataBaseFunctions
const {
  asyncHandler,
  findAllBooks,
  searchBooks,
  renderNewView,
  postNewBook,
  renderEditView,
  updateBook,
  deleteBook,
  pagination
} = require("../dataBaseFunctions")

//Testionng pagination not yet finished
router.get("/pagination/:page", asyncHandler(pagination))

//Retrives all the books from the database.
router.get("/", asyncHandler(findAllBooks))

//Retrives books based on a search
router.post("/search", asyncHandler(searchBooks))

//Renders the new-book template.
router.get("/new", renderNewView)

//Post (creates) a new book to the data base
router.post("/new", asyncHandler(postNewBook))

//Renders the template to edit a book based on id
router.get("/edit/:id", asyncHandler(renderEditView))

//update a book based on id
router.post("/edit/:id", asyncHandler(updateBook))

//Delet a book based on id
router.post("/:id/delete", asyncHandler(deleteBook))

module.exports = router;
