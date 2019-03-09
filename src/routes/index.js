"use strict";
// IMPORTS
const express       = require('express');
const router        = express.Router();
const dotenv        = require('dotenv');
const {logger} = require("../services/logger");

dotenv.config();
const env = process.env.NODE_ENV || 'development';

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
router.use('/users', require('../bundles/users/router'));

module.exports = router;