const db = require("../config/firebase_admin");
const role_list = require("../config/roles_list");
const Usuarios = require("../model/user.model");
const { generateToken } = require("../utils/token_jwt");

const collection = db.collection("usuarios");

const getAll = async (req, res, next) => {
	try {
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
		const { nome, email } = req.body;
		await collection
			.where("nome", "==", `${nome}`)
			.get()
			.then((snap) => {
				snap.forEach((doc) => {
					const user = new Usuarios(
						doc.id,
						doc.data().nome,
						doc.data().email,
						doc.data().agenda,
						doc.data().roles
					);
					userList.push(user);
				});
			})
			.catch((err) => res.send({ message: err.message }));
		const user = userList[0];
		if (
			email.localeCompare(user.email) > 0 ||
			email.localeCompare(user.email) < 0
		) {
			console.log(user.email + " " + email);
			console.log(email.localeCompare(user.email));
			res.status(404).send({ message: "usuario não encontrado" });
			return;
		}
		res.send({ 
			token: `${generateToken(user)}`,
			tokenType: "Bearer",
			TokenTime: "15 min"
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error.message });
	}
};

const addUser = async (req, res) => {
	try {
		const { nome, email, senha, agenda, role } = req.body;

		if (role == undefined || null &&
			nome == undefined || null &&
			email == undefined || null &&
			senha == undefined || null &&
			agenda == undefined || null) {
			res.status(400).send({ message: "todos os campos devem ser informados" });
			return;
		}

		console.log(
			nome + " " + email + " " + senha + " " + agenda + " " + role
		);

		const user = { nome, email, senha, agenda, role };
		await collection.doc().set(user);
		res.send({ message: "salvo com sucesso" });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		await collection.doc(id).update(data);
		const user = await collection.doc(id).get();
		res.send(user.data());
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		await collection.doc(id).delete();
		res.send("Usuario deletado com sucesso!!");
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

module.exports = {
	getAll,
	getById,
	addUser,
	updateUser,
	deleteUser,
	getUserForLogin,
};
