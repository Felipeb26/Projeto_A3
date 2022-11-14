const service = require("../service/pdf.service");
const pdf = require("html-pdf");
const { today } = require("../utils/data.utils");
const emailNode = require("../utils/mail.config");
const uuid = require("uuid");
const { deletes } = require("../utils/deleteFile.utils.js");

const name = `${__dirname}/upload/arquivo.pdf`;
const pasta = name.substring(0, name.lastIndexOf("/"));
const transporter = emailNode.transport;
const newName = uuid.v4();

const boasVindasController = async (req, res) => {
	try {
		let { user } = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		pdf.create(service.boasVindasUsuario(user), service.options).toFile(
			name,
			(erro, response) => {
				if (erro) {
					console.log(erro);
					return res.status(500).send(erro);
				}
				(function sendMail() {
					transporter
						.sendMail({
							from: "Felipe Batista <felipeb2silva@gmail.com>",
							replyTo: "lipethunderb@gmail.com",
							to: "felipeb2silva@gmail.com",
							subject: "Origami Saúde",
							text: "testando",
							priority: "high",
							date: today,
							attachments: [
								{
									filename: `${newName}.pdf`,
									path: name,
								},
							],
						})
						.then(() => {
							deletes(name, pasta);
							return res.send({
								message: `email enviado com sucesso`,
							});
						})
						.catch((err) => {
							console.log(err);
							return res.status(500).send(err);
						});
				})();
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	boasVindasController,
};
