const {
	options,
	atestado,
	medicamento,
	boasVindas,
} = require("../service/pdf.service");
const pdf = require("html-pdf");
const { today } = require("../utils/data.utils");
const { transport } = require("../utils/mail.config");

let fileName = `${__dirname}/upload/arquivo.pdf`;
const transporter = transport;

const boasVindasController = async (req, res) => {
	try {
		pdf.create(boasVindas, options).toFile(fileName, (erro, response) => {
			if (erro) {
				console.log(erro);
				return res.status(500).send(erro);
			}
			async(function sendMail() {
				transporter
					.sendMail({
						from: "Felipe Batista <felipeb2silva@gmail.com>",
						replyTo: "lipethunderb@gmail.com",
						to: "felipeb2silva@gmail.com",
						subject: "teste",
						text: "testando",
						priority: "high",
						date: today,
					})
					.then(() => {
						return res.send({
							message: `email enviado com sucesso`,
						});
					})
					.catch((err) => {
						console.log(err);
						return res.status(500).send(err);
					});
			})();
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
    boasVindasController
};
