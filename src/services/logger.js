"use strict";
// IMPORTS
const {
	createLogger,
	format,
	transports
} = require('winston');
const dotenv = require('dotenv');
const logsConfig = require('../config/logger');
const {
	combine,
	printf
} = format;
const moment = require("moment");
const dirExistOrCreate = require("../services/files_directory").dir.existOrCreate;
// TODO create mailing system
// config
dotenv.config();
const env = process.env.NODE_ENV || "development";

function Logging() {
	console.log(`Logging set to ${env}`);
	// TODO CREATE DIRS
	this.dir = `./logs/${env}/${moment().format()}/`;

	const myCustomLevels = {
		levels: {
			error: 0,
			warn: 1,
			info: 2,
			debug: 3,
			silly: 4
		},
		colors: {
			error: 'red',
			warn: 'orange',
			info: 'blue',
			debug: 'green',
			silly: 'black'
		}
	};

	const myFormat = printf(info => {
		moment.locale('fr');
		return moment().format("D/M/YYYY, dddd, kk:mm:ss") + ' ' + info.level + ': ' + info.message;
	});

	const logger = createLogger({
		level: myCustomLevels.levels,
		format: combine(
			myFormat
		)
	});

	if (env === 'production') {
		if (logsConfig.production.show_silly_in_console === true) {
			logger.add(new transports.Console({
				level: 'silly'
			}));
		} else if (logsConfig.production.show_debug_in_console === true) {
			logger.add(new transports.Console({
				level: 'debug'
			}));
		} else if (logsConfig.production.show_info_in_console === true) {
			logger.add(new transports.Console({
				level: 'info'
			}));
		} else if (logsConfig.production.show_warn_in_console === true) {
			logger.add(new transports.Console({
				level: 'warn'
			}));
		} else if (logsConfig.production.show_error_in_console === true) {
			logger.add(new transports.Console({
				level: 'error'
			}));
		}

		if (logsConfig.production.show_silly_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}silly.log`,
				level: 'info'
			}));
		}
		if (logsConfig.production.show_debug_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}debug.log`,
				level: 'debug'
			}));
		}
		if (logsConfig.production.show_info_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}info.log`,
				level: 'info'
			}));
		}
		if (logsConfig.production.show_warn_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}warn.log`,
				level: 'warn'
			}));
		}
		if (logsConfig.production.show_error_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}error.log`,
				level: 'error'
			}));
		}
		if (logsConfig.production.send_error_by_mail === true) {
			logger.add(new mailTransport({
				level: 'error'
			}));
		}
	} else if (env === 'development') {
		// TODO : is this function usefull ?
		//	dirExistOrCreate("./logs");
		//	dirExistOrCreate("./logs/development");
		if (logsConfig.development.show_silly_in_console === true) {
			logger.add(new transports.Console({
				level: 'silly'
			}));
		} else if (logsConfig.development.show_debug_in_console === true) {
			logger.add(new transports.Console({
				level: 'debug'
			}));
		} else if (logsConfig.development.show_info_in_console === true) {
			logger.add(new transports.Console({
				level: 'info'
			}));
		} else if (logsConfig.development.show_warn_in_console === true) {
			logger.add(new transports.Console({
				level: 'warn'
			}));
		} else if (logsConfig.development.show_error_in_console === true) {
			logger.add(new transports.Console({
				level: 'error'
			}));
		}

		if (logsConfig.development.show_silly_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}silly.log`,
				level: 'silly'
			}));
		}
		if (logsConfig.development.show_debug_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}debug.log`,
				level: 'debug'
			}));
		}
		if (logsConfig.development.show_info_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}info.log`,
				level: 'info'
			}));
		}
		if (logsConfig.development.show_warn_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}warn.log`,
				level: 'warn'
			}));
		}
		if (logsConfig.development.show_error_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}error.log`,
				level: 'error'
			}));
		}
		if (logsConfig.development.send_error_by_mail === true) {
			logger.add(new mailTransport({
				level: 'error'
			}));
		}
	} else if (env === 'test') {

		if (logsConfig.test.show_silly_in_console === true) {
			logger.add(new transports.Console({
				level: 'silly'
			}));
		} else if (logsConfig.test.show_debug_in_console === true) {
			logger.add(new transports.Console({
				level: 'debug'
			}));
		} else if (logsConfig.test.show_info_in_console === true) {
			logger.add(new transports.Console({
				level: 'info'
			}));
		} else if (logsConfig.test.show_warn_in_console === true) {
			logger.add(new transports.Console({
				level: 'warn'
			}));
		} else if (logsConfig.test.show_error_in_console === true) {
			logger.add(new transports.Console({
				level: 'error'
			}));
		}

		if (logsConfig.test.show_silly_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}silly.log`,
				level: 'silly'
			}));
		}
		if (logsConfig.test.show_debug_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}debug.log`,
				level: 'debug'
			}));
		}
		if (logsConfig.test.show_info_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}info.log`,
				level: 'info'
			}));
		}
		if (logsConfig.test.show_warn_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}warn.log`,
				level: 'warn'
			}));
		}
		if (logsConfig.test.show_error_in_file === true) {
			logger.add(new transports.File({
				filename: `${this.dir}error.log`,
				level: 'error'
			}));
		}
		if (logsConfig.test.send_error_by_mail === true) {
			logger.add(new mailTransport({
				level: 'error'
		
			}));
		}
	}
	Logging.prototype.logger = logger;
}


// logger.addColors(myCustomLevels.colors);


module.exports = new Logging();