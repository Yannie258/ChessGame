/**
 * Render page error.hbs on server error
 *
 * Add after all routes to render with layout.hbs
 */
function errorHandlerMiddleware(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}

module.exports = errorHandlerMiddleware;
