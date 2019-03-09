"use strict";
// imports
const express = require("express");
//const csp = require("helmet-csp");
const helmet = require("helmet");
const cors = require("cors");
//const morgan = require("morgan");
const dotenv = require("dotenv");
//const logger = require("../services/logger");
// TODO knowledge
//const compression = require("compression");
const bodyParser = require("body-parser");
const apiRouter = require("../routes");
// TODO install
//const passport = require("passport");

// config
dotenv.config();

// CONST
const env = process.env.NODE_ENV || "development";

// todo : changer la clef
/*const SECRET_OR_KEY = process.env.SECRET_OR_KEY ?
    process.env.SECRET_OR_KEY :
    "kjqsdjkqkdhbchbhzgady667328IEZHJDHKHDZJHKlskqldoiç";
*/
// Instantiate app
const app = express();
// TODO Logging
//app.use(morgan("combined", { stream: { write: (message) => logger.info(message) } }));

// Helmet
app.use(helmet());

// CORS.
// TODO get knowledge 
app.use(
    cors({
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
// TODO Passport
// app.use(passport.initialize());

// Body Parser configuration
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use(bodyParser.json({
    limit: "10mb"
}));

//app.use(express.static('./public'));
app.use("/api/", apiRouter);
// app.use("/test/", testRoute);
app.use(function (req, res) {
    return res.status(404).json({
        error: "Page not found"
    });
});

module.exports = app;