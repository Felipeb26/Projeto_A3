const morgan = require("morgan");
const path = require("path");
var rfs = require("rotating-file-stream"); // version 2.x


var accessLogStream = rfs.createStream("access.log", {
	interval: "1d",
	path: path.join(__dirname, "log"),
});

module.exports = morgan(
	function (tokens, req, res) {
		return [
			`Method: ${tokens.method(req, res)};`,
			`Url: ${tokens.url(req, res)}; `,
			`Status-code: ${tokens.status(req, res)}; `,
			`Content-Length: ${tokens.res(req, res, "content-length")}; `,
			`Response-Time: ${tokens["response-time"](req, res)}ms; `,
			"------------------------------------------------------------------------------------------------------------------------------\n\n",
		].join("\t");
	},
	{
		stream: accessLogStream,
	}
);
