"use strict";
// IMPORTS
const fs = require("fs");

module.exports.dir = {
	existOrCreate: async (path, mask = "0777") => {
		await fs.mkdir(path, mask, function (err) {
			try {
				if (err) {
					if (err.code == 'EEXIST') return null; // ignore the error if the folder already exists
					else throw (err); // something else went wrong
				} else return null; // successfully created folder
			} catch (error) {
				if (err) {
					if (err.code == 'EEXIST') return (null); // ignore the error if the folder already exists
					else {
						throw (err); // something else went wrong
					}
				}
			}
		});
	}
}