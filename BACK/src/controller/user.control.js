const db = require("../config/firebase_admin");
const Usuarios = require("../model/user.model");
const { generateToken } = require("../utils/token_jwt");
const {
	verifyRoles,
	toDate,
	verifyDate,
	isValidDate,
} = require("../utils/verify");

const collection = db.collection("usuarios");

const getAllPaginate = async (req, res, next) => {
	try {
		let limit = req.query.limit || 10;
		let after = req.query.after;
		let before = req.query.before;
		let view = req.query.view || "agenda";
		limit = parseInt(limit);

		let data = collection.orderBy(view, "asc");

		if (after) {
			data = data.startAfter(after).limit(limit);
		} else if (before) {
			data = data.endBefore(before).limit(limit);
		} else {
			data = data.limit(limit);
		}

		const snapshots = await data.get();
		const userList = [];

		if (snapshots.empty) {
			res.send(400).send({ message: "sem usuarios cadastrados" });
		} else {
			snapshots.forEach((it) => {
				const users = new Usuarios(
					it.id,
					it.data().nome,
					it.data().email,
					it.data().senha,
					verifyDate(it.data().agenda),
					it.data().role
				);
				userList.push(users);
			});
		}

		content = {
			users: userList,
			pagination: {
				prev:
					userList.length > 0 && (after || before)
						? userList[0].agenda
						: null,
				next:
					userList.length == limit
						? userList[userList.length - 1].agenda
						: null,
				totalElements: userList.length,
			},
		};

		return res.status(200).send(content);
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

const getAll = async (req, res, next) => {
	try {
		let data = collection.orderBy("agenda", "asc");
		const userList = [];

		data = await data.get();
		if (data.empty) {
			res.send(400).send({ message: "sem usuarios cadastrados" });
		} else {
			data.forEach((it) => {
				const users = new Usuarios(
					it.id,
					it.data().nome,
					it.data().email,
					it.data().senha,
					verifyDate(it.data().agenda),
					it.data().role,
					it.data().crm,
					it.data().especialidade
				);
				userList.push(users);
			});
			res.send(userList);
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const getById = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await collection.doc(id).get();
		if (!user.exists) {
			res.status(404).send({ message: error.message });
		} else {
			res.send(user.data());
		}
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const getUserForLogin = async (req, res) => {
	try {
		const userList = [];
		let { senha, email } = req.body;

		senha = new String(senha);
		email = new String(email);

		await collection
			.where("senha", "==", `${senha}`)
			.get()
			.then((snap) => {
				snap.forEach((doc) => {
					const user = new Usuarios(
						doc.id,
						doc.data().nome,
						doc.data().email,
						doc.data().senha,
						doc.data().agenda,
						doc.data().role,
						doc.data().crm,
						doc.data().especialidade
					);
					userList.push(user);
				});
			})
			.catch((err) => res.send({ message: err.message }));

		let index = userList.findIndex((it) => it.email == email);

		if (index == -1) {
			return res
				.status(404)
				.send({ erro: `usuario nao encontrado ${senha}` });
		}

		const user = userList[index];

		res.send({
			token: `${generateToken(user)}`,
			tokenType: "Bearer",
			TokenTime: "15 min",
		});
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const addUser = async (req, res) => {
	try {
		let { nome, email, senha, agenda, role, crm, especialidade, telefone } =
			req.body;

		if (
			role == undefined || null 
			&& nome == undefined ||	null 
			&& email == undefined || null 
			&& senha == undefined || null
			&& telefone == undefined || null
		) {
			res.status(400).send({
				message: "todos os campos devem ser informados",
			});
			return;
		}

		if (agenda == null || undefined) {
			agenda = Date.now();
			agenda = agenda.toString();
		}

		const data = await collection.get();
		const userList = [];
		if (data.empty) {
			res.send(400).send({ message: "sem usuarios cadastrados" });
		} else {
			data.forEach((it) => {
				const users = new Usuarios(
					it.id,
					it.data().nome,
					it.data().email,
					it.data().senha,
					it.data().agenda,
					it.data().role,
					it.data().crm,
					it.data().especialidade
				);
				userList.push(users);
			});
		}

		let errorList = [];
		userList.forEach((it) => {
			if (it.email == email) {
				errorList.push(`Email: ${email} já cadastro em sistema!`);
			}
			if (it.telefone == telefone) {
				errorList.push(`Telefone: ${telefone} já cadastro em sistema!`);
			}
			if (it.agenda == agenda) {
				errorList.push(`Data ${agenda} não pode ser selecionada`);
			}
		});

		if (errorList.length > 0) {
			errorList = [...new Set(errorList)];
			return res.status(400).send({ errorList });
		}

		role = verifyRoles(role);
		senha = new Buffer.from(senha).toString("base64");

		if (crm != null || undefined) {
			const doc = {
				nome,
				email,
				senha,
				agenda,
				role,
				telefone,
				crm,
				especialidade,
			};

			await collection.doc().set(doc);
			return res.status(201).send(doc);
		}

		const user = {
			nome,
			email,
			senha,
			agenda,
			telefone,
			role,
		};

		await collection.doc().set(user);
		return res.status(201).send(user);
	} catch (error) {
		res.status(400).send({ message: `erro ao adicionar: ${error}` });
	}
};

const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		if (data == null) {
			return res
				.status(400)
				.send({ erro: "sem dados para alterar usuario" });
		}
		await collection.doc(id).update(data);

		const user = await collection.doc(id).get();
		return res.send(user.data());
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		await collection.doc(id).delete();
		res.send({ message: "Usuario deletado com sucesso!!" });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

module.exports = {
	getAllPaginate,
	getAll,
	getById,
	addUser,
	updateUser,
	deleteUser,
	getUserForLogin,
};
