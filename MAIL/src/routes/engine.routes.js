const route = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");

const { boasVindasController } = require("../controller/email.controller");

const name = uuid.v4();
let fileName = `${__dirname}/upload/arquivo.pdf`;

route.get("/:data", async (req, res, next) => {
	const data = req.params.data;
	try {
		pdf.create(atestado(data), pdfOptions).toBuffer((err, buffer) => {
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
		return res.status(500).send({ erro: error.mensage });
	}
});

route.post("/bem", boasVindasController);

// route.post("/", async (req, res, next) => {
// 	try {
// 		let errorsList = [];

// 		let { para, assunto, mensagem, modelo } = req.body;

// 		if (
// 			para == null ||
// 			undefined ||
// 			assunto == null ||
// 			undefined ||
// 			mensagem == undefined ||
// 			null
// 		) {
// 			errorsList.push("precisa informar todos os campos");
// 		}
// 		if (modelo == undefined || null) {
// 			errorsList.push("modelo não foi informado!!");
// 		}
// 		if (errorsList.length > 0) {
// 			errorsList = [...new Set(errorsList)];
// 			return res.send(errorsList);
// 		}

// 		let html;
// 		modelo = modelo.toLowerCase();
// 		switch (modelo) {
// 			case "atestado":
// 				html = atestado(today);
// 				break;
// 			case "medicamento":
// 				html = medicamento(today);
// 				break;
// 			default:
// 				return res
// 					.status(400)
// 					.send({ error: "modelo não existente!!" });
// 		}

// 		pdf.create(html, pdfOptions).toFile(fileName, (err, resp) => {
// 			if (err) return res.status(500).send({ erro: err.message });

// 			const transporter =

// 			const dados = {
// 				para: para,
// 				assunto: assunto,
// 				mensagem: mensagem,
// 			};

// 			dados.para = dados.para.split(";");
// 			async (function sendMail() {
// 				transporter
// 					.sendMail({
// 						from: "Felipe Batista <felipeb2silva@gmail.com>",
// 						replyTo: "lipethunderb@gmail.com",
// 						to: [dados.para],
// 						subject: dados.assunto,
// 						text: dados.mensagem,
// 						priority: "high",
// 						date: Date.now(),
// 						attachments: [
// 							{
// 								filename: `${name}.pdf`,
// 								path: fileName,
// 							},
// 						],
// 					})
// 					.then(() => {
// 						let deleted = deleteFile();
// 						if (deleted > 0) {
// 							return res
// 								.status(400)
// 								.send({ error: "erro ao deletar arquivo" });
// 						}
// 						return res.send({
// 							message: `email enviado com sucesso`,
// 						});
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 						return res.status(500).send(err);
// 					});
// 			})()
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).send({ erro: error.message });
// 	}
// });

const deleteFile = () => {
	try {
		fs.unlinkSync(fileName);
		fs.rmdirSync(`${__dirname}/upload`);
		console.log("pasta e arquivo deletado");
		return 0;
	} catch (error) {
		console.log("error ao deletar arquivo");
		console.log(error.message);
		return 1;
	}
};

module.exports = route;
