const config = require("./config");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const errorHandlerMiddleware = require("./logic/middlewares/errorHandlerMiddleware");
const notFoundMiddleware = require("./logic/middlewares/notFoundMiddleware");
const hbs = require("hbs");
const app = express();

//#region EXPRESS SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(logger(config.isDevelopment ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
//#endregion

//#region ROUTING
app.use(indexRouter);
app.use(usersRouter);
app.use(apiRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
//#endregion

module.exports = app;
