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

//Retrives all the books from the database and displays pagination buttons
router.get("/", asyncHandler(findAllBooks))

//Retrives books based on a search.
router.post("/search", asyncHandler(searchBooks))

//Renders the new-book template.
router.get("/new", renderNewView)

//Post or creates a new book to the data base.
router.post("/new", asyncHandler(postNewBook))

//Renders the template to edit a book based on id.
router.get("/:id", asyncHandler(renderEditView))

//Update a book based on id.
router.post("/:id", asyncHandler(updateBook))

//Deletes a book based on id.
router.post("/:id/delete", asyncHandler(deleteBook))

module.exports = router;
