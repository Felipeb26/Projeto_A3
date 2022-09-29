const route = require("express").Router();
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

const fs = require("fs");
const { Stream } = require("stream");

route.get("/", async (req, res, next) => {
	const time = new Date();
	const date = time.toLocaleDateString();
	const timer = time.toLocaleTimeString();

	const today = date + " " + timer;

	const ejsFile = path.join(__dirname, "../", "templates", "index.ejs");

	ejs.renderFile(ejsFile, { today: today }, (err, html) => {
		if (err) {
			console.log(err);
			return res.send({ message: err });
		}

		const options = {
			directory: "/tmp",
			orientation: "portrait",
			renderDelay: 1000,
			height: "11.25in",
			width: "8.5in",
			header: {
				height: "15mm",
			},
			footer: {
				height: "15mm",
			},
			type: "pdf",
			childProcessOptions: {
				env: {
					OPENSSL_CONF: "/dev/null",
				},
			},
		};

		res.setHeader("Content-type", "application/pdf");

		pdf.create(html, options).toBuffer(function (err, data) {
			if (err) {
				console.log(`erro ${err}`);
				return res.send(err);
			}
			if (data instanceof Stream) {
				data.pipe(fs.createWriteStream("./teste.pdf"));
				return res.send(data);
			}
			if (data instanceof Buffer) {
				return res.send(data);
			}
		});
	});
});

module.exports = route;