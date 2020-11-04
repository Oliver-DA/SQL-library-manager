const { Book } = require("./models");
const { generate404 } = require("./errorHandlers")

//Async handler
const asyncHandler = (cb) => {

    return async (req, res, next) => {
        try {
        await cb(req, res, next)

        } catch(error) {
        next(error)
        }
    }
}

const findAllBooks = async (req, res) => {

    const books = await Book.findAll({ order: [["year", "ASC"]]})
    res.render("books/index", { books })
}

const renderNewView = (req, res) => {
    res.render("books/new", { book: {} , title: "New Book"})
}

const postNewBook = async (req, res) => {
    let book;
    try {
  
      book = await Book.create(req.body)
      res.redirect("/")
  
    } catch (error) {
  
      if (error.name == "SequelizeValidationError") {
  
        book = await Book.build(req.body);
        res.render("books/new", { book, errors: error.errors, title: "New Book"})
        
      } else {
        throw error
      }
    }
}

const renderEditView = async (req, res, next) => {
    const { id } = req.params;

    const book = await Book.findByPk(id);
  
    if (book) {
      res.render("books/update", { book, title: "Update Book"})
  
    } else {
      next(generate404(id))
    }
}

const updateBook = async (req, res, next) => {
    const { id } = req.params;

    book = await Book.findByPk(id);
  
    try {
  
      if (book) {
        await book.update(req.body)
        res.redirect("/")
  
      } else {
        next(generate404(id))
      }
  
    } catch (error) {
  
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("books/update", { book, errors:error.errors, title: "Update Book"})
  
      } else {
        throw error
      }
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(req.params.id);

    if (book) {
        await book.destroy();
        res.redirect("/")

    } else {
        generate404(id)
    }
}

module.exports = 
{
    asyncHandler,
    findAllBooks,
    renderNewView,
    postNewBook,
    renderEditView,
    updateBook,
    deleteBook
} 