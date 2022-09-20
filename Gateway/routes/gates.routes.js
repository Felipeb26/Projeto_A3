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
				url: reg.services[req.params.apiName].url + req.params.path+value,
				headers: req.headers,
				data: req.body,
			})
				.then(response => {
					console.log(`Resposta: ${response.data}`);
					res.send(response.data);
				})
				.catch(error => {
					res.send(error);
					console.log(`Resposta: ${error}`);
				});
			console.log(`${req.method} ${reg.services[req.params.apiName].url + req.params.path+value}`);
		} else {
			res.send({ message: "no service for this param" });
		}
	} catch (error) {
		res.send({ erro: error.message });
	}
});

module.exports = route;
