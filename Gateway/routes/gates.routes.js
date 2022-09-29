const route = require("express").Router();
const axios = require("axios");
const reg = require("../registry.json");

route.all("/:apiName/:path/:value", async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			let value = "/" + req.params.value;
			value = value == undefined || value == null ? "" : value;
			await axios({
				method: req.method,
				url:
					reg.services[req.params.apiName].url +
					req.params.path +
					value,
				data: req.body,
			})
				.then((data) => {
					res.send(data.data);
				})
				.catch((err) => {
					res.send({ message: err.message });
				});
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

route.all("/:apiName/:path", async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			await axios({
				method: req.method,
				url: reg.services[req.params.apiName].url + req.params.path,
				data: req.body,
			})
				.then((data) => {
					res.send(data.data);
				})
				.catch((err) => {
					res.send({ message: err.message });
				});
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

route.all("/:apiName/", async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			await axios({
				method: req.method,
				url: reg.services[req.params.apiName].url,
				data: req.body,
			})
				.then((data) => {
					res.send(data.data);
				})
				.catch((err) => {
					res.send({ message: err.message });
				});
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

module.exports = route;
