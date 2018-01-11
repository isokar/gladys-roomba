module.exports = function(sails) {
	var exec = require('./lib/exec.js');
	var install = require('./lib/install.js')
	return {
		exec: exec,
		install: install,
	};
};