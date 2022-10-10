//import node
const route = require("express").Router();
const pdf = require("html-pdf");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const fs = require("fs");

const time = new Date();
const date = time.toLocaleDateString();
const timer = time.toLocaleTimeString();
const today = date + " " + timer;

//imports folders
const { html, pdfOptions } = require("../service/pdf.service");
const SMTP_CONFIG = require("../service/email.service");

const name = uuid.v4();
const fileName = `${__dirname}/upload/arquivo.pdf`;

route.get("/:data", async (req, res, next) => {
	const data = req.params.data;

	try {
		pdf.create(html(data), pdfOptions).toBuffer((err, buffer) => {
			if (err) {
				return res.status(500).send({ error: err.message });
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
		return res.status(500).send({ erro: error.mensage });
	}
});

route.post("/", async (req, res, next) => {
	try {
		const { para, assunto, mensagem } = req.body;

		if (
			para == null ||
			undefined ||
			assunto == null ||
			undefined ||
			mensagem == undefined ||
			null
		) {
			return res
				.status(400)
				.send({ erro: `precisa informar todos os campos` });
		}

		pdf.create(html(today), pdfOptions).toFile(fileName, (err, resp) => {
			if (err) {
				console.log(err);
				return res.status(500).send({ erro: err.message });
			}

			const transporter = nodemailer.createTransport({
				host: SMTP_CONFIG.host,
				port: SMTP_CONFIG.port,
				secure: false,
				auth: {
					user: SMTP_CONFIG.user,
					pass: SMTP_CONFIG.pass,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			const dados = {
				para: para,
				assunto: assunto,
				mensagem: mensagem,
			};

			async function sendMail() {
				await transporter
					.sendMail({
						from: "Felipe Batista <felipeb2silva@gmail.com",
						replyTo: "lipethunderb@gmail.com",
						to: [dados.para],
						subject: dados.assunto,
						text: dados.mensagem,
						priority: "high",
						date: Date.now(),
						attachments: [
							{
								filename: `${name}.pdf`,
								path: fileName,
							},
						],
					})
					.then(() => {
						deleteFile();
						return res.send({
							message: "email enviado para com sucesso",
						});
					})
					.catch((err) => {
						console.log(err);
						return res.status(500).send(err);
					});
			}
			sendMail();
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ erro: error.message });
	}
});

function deleteFile() {
	try {
		fs.unlinkSync(fileName);
		console.log("arquivo deletado");
	} catch (error) {
		console.log("error ao deletar arquivo");
		console.log(error.message);
	}
}

module.exports = route;
