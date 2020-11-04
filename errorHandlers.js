const generate404 = (id) => {
  
    const error = new Error();
    error.message = `Sorry looks like the book with the id |${id}| is not in  our database :(`
    error.status = 404;
    return error
}

const pageNotFoundError = (req, res) => {

    const error = new Error()
    error.message = "Sorry seems that this is not the page you are looking for :("
    error.status = 404;
    res.render("page-not-found", { error })
}

const globalError = (error, req, res, next) => {

  if(error.status === 404) {
    res.render("page-not-found", { error })
  }

  //If error.message exist leave as is if not give it a new value
  error.message = error.message || "Something went wrong with the server"

  //If status code is not provided we'll use 500
  error.status = error.status || 500;

  res.render('error', { error });
}

module.exports = { generate404, pageNotFoundError, globalError }