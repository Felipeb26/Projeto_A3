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

const previewPDF = async (req, res) => {
	try {
		const errorList = [];

		let { user, modelo } = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);
		if (user == null || undefined) {
			errorList.push("Necessario informar o nome do usuario");
		}
		if (modelo == null || undefined) {
			errorList.push("Necessario informar o modelo do email");
		}

		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}

		let pdfModel;
		switch (modelo) {
			case "atestado":
				pdfModel = service.atestado(user);
				break;
			case "medicamento":
				pdfModel = service.medicamento(user);
				break;
			case "boas_vindas_usuario":
				pdfModel = service.boasVindasUsuario(user);
				break;
			case "boas_vindas_medico":
				pdfModel = service.boasVindasMedico(user);
				break;
			default:
				return res
					.status(400)
					.send({ message: "erro nenhum modelo valido escolhido" });
		}

		pdf.create(pdfModel, service.options).toBuffer((err, buffer) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res
				.writeHead(200, {
					"Content-Length": Buffer.byteLength(buffer),
					"Content-Type": "application/pdf",
					"Content-disposition": ` attachment;filename=${name}.pdf`,
				})
				.end(buffer);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};

const boasVindasController = async (req, res) => {
	try {
		const errorList = [];
		let { user, para ,mensagem} = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		if (user == null || undefined) {
			errorList.push("Necessario informar nome do usuario");
		}
		if (para == null || undefined) {
			errorList.push("Necessario informar email para quem enviar");
		}
		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}

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
							to: para,
							subject: "Origami Saúde",
							text: mensagem,
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
		return res.status(500).send(error);
	}
};

const boasVindasDocController = async (req, res) => {
	try {
		const errorList = [];

		let { user, para ,mensagem} = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		if (user == null || undefined) {
			errorList.push("Necessario informar nome do usuario");
		}
		if (para == null || undefined) {
			errorList.push("Necessario informar email para quem enviar");
		}
		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}

		pdf.create(service.boasVindasMedico(user), service.options).toFile(
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
							to: para,
							subject: "Origami Saúde",
							text: mensagem,
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
		return res.status(500).send(error);
	}
};

const agendamentoController = async (req, res) => {
	try {
		const errorList = [];

		let { user, para ,mensagem} = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		if (user == null || undefined) {
			errorList.push("Necessario informar nome do usuario");
		}
		if (para == null || undefined) {
			errorList.push("Necessario informar email para quem enviar");
		}
		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}
		pdf.create(service.agendamento(user), service.options).toFile(
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
							to: para,
							subject: "Origami Saúde",
							text: mensagem,
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
		return res.status(500).send(error);
	}
};

const atestadoController = async (req, res) => {
	try {
		const errorList = [];

		let { user, para ,mensagem} = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		if (user == null || undefined) {
			errorList.push("Necessario informar nome do usuario");
		}
		if (para == null || undefined) {
			errorList.push("Necessario informar email para quem enviar");
		}
		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}

		pdf.create(service.atestado(user), service.options).toFile(
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
							to: para,
							subject: "Origami Saúde",
							text: mensagem,
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
		return res.status(500).send(error);
	}
};

const medicamentoController = async (req, res) => {
	try {
		const errorList = [];

		let { user, para ,mensagem} = req.body;
		user = user.charAt(0).toUpperCase() + user.slice(1);

		if (user == null || undefined) {
			errorList.push("Necessario informar nome do usuario");
		}
		if (para == null || undefined) {
			errorList.push("Necessario informar email para quem enviar");
		}
		if (errorList.length > 0) {
			return res.status(400).send(errorList);
		}
		pdf.create(service.medicamento(user), service.options).toFile(
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
							to: para,
							subject: "Origami Saúde",
							text: mensagem,
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
		return res.status(500).send(error);
	}
};

module.exports = {
	boasVindasController,
	boasVindasDocController,
	atestadoController,
	medicamentoController,
	agendamentoController,
	previewPDF,
};
