const { Book } = require("./models");
const { generate404 } = require("./errorHandlers")
const { Op } = require("./models").Sequelize

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

//Pagination
const pagination = async (req, res) => {

  //Gets the current page where the user is 
  const currentPage = req.params.page
  const offset = ( currentPage - 1 ) * 7
  //Retrives 7 books starting from the value of offset.
  const { count, rows } = await Book.findAndCountAll({ offset, limit: 7 });
  const pages = Math.ceil( count / 7 );

  res.render("books/index", {books: rows, pages }) 

}

//Search for books
const searchBooks = async (req, res) => {

  //Query is the value inserted in the text field for search
  const query = req.body.query || req.cookies.userQuery;

  if (query) {
    //Sets a cookie for query
    res.cookie("userQuery", query)
    //Calls Book.Findall() if any of the objects inside [Op.or] matches the query
    const searchedBooks = await Book.findAll({

      where: {
        [Op.or]: [

          {title: {
            [Op.substring] : query
          }},

          {year: {
            [Op.substring]: query
          }},

          {author: {
            [Op.substring]: query
          }},

          {genre: {
            [Op.substring]: query
          }}

        ]
      },
      //Returns the books in ascendent order by their year
      order:[["year", "ASC"]]
    });
    
    res.render("books/index", { books: searchedBooks, query });
    
  } else {
    findAllBooks(req, res);
  }

}

//Find All Books
const findAllBooks = async (req, res) => {

  //Clear the cookie with the name userQuery used for the search.
  res.clearCookie("userQuery");
  //retrives the first 7 boos from the dataBase and stores them in rows
  const { count, rows } = await Book.findAndCountAll({offset:0, limit:7 });
  //Set the pages to the total numbers of books (count) / 7
  const pages = Math.ceil(count / 7);

  res.render("books/index", { books:rows, pages});

}

//Render the template to create a new book
const renderNewView = (req, res) => {
  res.render("books/new-book", { book: {} , title: "New Book"})
}

//creating a new book
const postNewBook = async (req, res) => {
  let book;

  try {

    book = await Book.create(req.body)
    res.redirect("/")

  } catch (error) {

    if (error.name == "SequelizeValidationError") {
      //If there's a sequelize error use Book.build()
      //to keep the values of the form and pass the errors to the template 
      book = await Book.build(req.body);
      res.render("books/new-book", { book, errors: error.errors, title: "New Book"})
      
    } else {
      throw error
    }
  }

}

//Render the template to edit a book
const renderEditView = async (req, res, next) => {

  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (book) {
    res.render("books/update-book", { book, title: "Update Book"})

  } else {
    //Error generator for books that could not be found.
    next(generate404(id))
  }
    
}

//Updating a book
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
      res.render("books/update-book", { book, errors:error.errors, title: "Update Book"})

    } else {
      throw error
    }
  }
}

//Deletgin a book
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
//exporting all the function to be use in ./routes/books.js
module.exports = 
{
  asyncHandler,
  searchBooks,
  findAllBooks,
  renderNewView,
  postNewBook,
  renderEditView,
  updateBook,
  deleteBook,
  pagination
} 