"use strict";
// IMPORTS
import express from 'express';
import dotenv  from 'dotenv';
import { logger } from "../services/logger";

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const router = express.Router();

function createResJson(req, res, next){
    // todo : change return in logout, login, register, badge
    if (env === "development"){
        logger.debug(`incomming request url : ${req.originalUrl}`);
    }
    req.return = {
        errors : {}
    };
    next();
}

router.all("*", createResJson);
// router.use("/", (req, res, next) => {
    // console.log("qwe");
// })
// router.use('/users', require('../bundles/users/router'));

module.exports = router;