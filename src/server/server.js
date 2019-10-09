'use strict';
import server from './app';
const port = process.env.PORT || 8080;
import { logger } from "../services/logger";


// launch server
server.listen(port, function () {
    logger.info("Server listening on port " + port);
});