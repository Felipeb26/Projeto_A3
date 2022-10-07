const route = require("express").Router();
const axios = require("axios");
const reg = require("../registros/registry.json");
const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
	max: 15,
	windowMs: 5000,
});

route.all("/:apiName/:path/:value", limiter, async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			let value = "/" + req.params.value;
			value = value == undefined || value == null ? "" : value;
			if (req.method == "POST") {
				await axios({
					method: req.method,
					url: reg.services[req.params.apiName].url + req.params.path,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({ message: err.message });
					});
			} else {
				await axios({
					method: req.method,
					url:
						reg.services[req.params.apiName].url +
						req.params.path +
						value,
					headers: req.headers,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({
							message: err.message,
						});
					});
			}
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

route.all("/:apiName/:path", limiter, async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			if (req.method == "POST") {
				await axios({
					method: req.method,
					url: reg.services[req.params.apiName].url + req.params.path,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({
							message: err.message,
						});
					});
			} else {
				await axios({
					method: req.method,
					url: reg.services[req.params.apiName].url + req.params.path,
					headers: req.headers,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({
							message: err.message,
						});
					});
			}
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

route.all("/:apiName/", limiter, async (req, res) => {
	try {
		if (reg.services[req.params.apiName]) {
			if (req.method != "GET" || req.method != "DELETE") {
				await axios({
					method: req.method,
					url: reg.services[req.params.apiName].url,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({
							message: err.message,
						});
					});
			} else {
				await axios({
					method: req.method,
					url: reg.services[req.params.apiName].url,
					headers: req.headers,
					data: req.body,
				})
					.then((data) => {
						return res.status(data.status).send(data.data);
					})
					.catch((err) => {
						res.status(err.response.status).send({
							message: err.message,
						});
					});
			}
		} else {
			res.status(400).send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

module.exports = route;
