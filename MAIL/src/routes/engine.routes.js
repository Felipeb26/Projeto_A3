//import node
const route = require("express").Router();
const pdf = require("html-pdf");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const fs = require("fs");

//imports folders
const { html, pdfOptions } = require("../service/pdf.service");
const SMTP_CONFIG = require("../service/email.service");

const name = uuid.v4();
const fileName = `${__dirname}/upload/arquivo.pdf`;

route.get("/", async (req, res, next) => {
	try {
		pdf.create(html("hoke"), pdfOptions).toBuffer((err, buffer) => {
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

		pdf.create(html(hoje), pdfOptions).toFile(fileName, (err, resp) => {
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
				para: "felipeb2silva@gmail.com",
				assunto: "teste",
				mensagem: "testando envio mcado",
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
						return res.send(err);
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
