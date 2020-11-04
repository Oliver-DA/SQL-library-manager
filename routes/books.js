var express = require('express');
var router = express.Router();
//DataBaseFunctions
const {
  asyncHandler,
  findAllBooks,
  renderNewView,
  postNewBook,
  renderEditView,
  updateBook,
  deleteBook
} = require("../dataBaseFunctions")

//Retrives all the books from the database.
router.get("/", asyncHandler(findAllBooks))

//Renders the new-book template.
router.get("/new", renderNewView)

//Post (creates) a new book to the data base
router.post("/new", asyncHandler(postNewBook))

//Renders the template to edit a book based on id
router.get("/:id", asyncHandler(renderEditView))

//update a book based on id
router.post("/:id", asyncHandler(updateBook))

//Delet a book based on id
router.post("/:id/delete", asyncHandler(deleteBook))

module.exports = router;
