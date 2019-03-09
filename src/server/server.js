'use strict';
const server = require('./app');
const port = process.env.PORT || 8080;
const {logger} = require("../services/logger");


// launch server
server.listen(port, function () {
    logger.info("Server listening on port " + port);
});