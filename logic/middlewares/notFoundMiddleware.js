const createError = require("http-errors");

/**
 * catch 404 and forward to error handler
 *
 * Add to the end of the routing
 */
function notFoundMiddleware(req, res, next) {
  next(createError(404));
}

module.exports = notFoundMiddleware;
