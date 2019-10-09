"use strict";
// IMPORTS
import Ramda from 'ramda';
import {
	createLogger,
	format,
	transports
} from 'winston';
import dotenv from 'dotenv';
import logsConfig from '../config/logger';
const {
	combine,
	printf
} = format;
import moment from "moment";

// TODO create mailing system
// config
dotenv.config();
const env = process.env.NODE_ENV || "development";

function Logging() {
	console.log(`Logging set to ${env}`);
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

	Ramda.mapObjIndexed((value, key) => {
		if (value === true){
			let [,level,,output] = key.split('_');
			if (output === 'console') {
				logger.add(new transports.Console({
					level: level
				}));
			} else if (output === 'file') {
				logger.add(new transports.File({
					filename: `${this.dir}${level}.log`,
					level: level
				}));
			} else if(output === 'mail') {
				// @TODO send by mail
			}
		}
	}, logsConfig.production);
	Logging.prototype.logger = logger;
}

module.exports = new Logging();