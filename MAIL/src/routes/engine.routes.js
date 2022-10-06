const route = require("express").Router();
const pdf = require("html-pdf");
const uuid = require("uuid");
const { html, pdfOptions } = require("../service/pdf.service");
const SMTP_CONFIG = require("../service/email.service");
const name = uuid.v4();

route.get("/", async (req, res, next) => {
	try {
		pdf.create(html, pdfOptions).toFile(
			"./upload/arquivo.pdf",
			(err, res) => {
				if (err) return res.status(500).send({ erro: err.message });
				console.log("arquivo criado");
			}
		);

		pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
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

route.get("/mail", async (req, res, next) => {
	try {
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

		console.table(dados)
		console.table(SMTP_CONFIG);

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
						{ filename: name, path: `../../upload/arquivo.pdf` },
					],
				})
				.then(() => {
					return res.send({
						message: "email enviado para com sucesso",
					});
				})
				.catch((err) => {
					return res.send(err);
				});
		}
		sendMail();
	} catch (error) {
		return res.status(500).send({ erro: error.mensage });
	} finally {
	}
});

module.exports = route;
