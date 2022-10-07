require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.ACESS_TOKEN_SECRET;

const generateToken = (pass) => {
	const acessToken = jwt.sign({ id: pass }, secret, { expiresIn: 900000 });
	return acessToken;
};

const authUser = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).send({ message: "unathorized" });
	}
	if (authHeader.toLowerCase().indexOf("bearer") == -1) {
		return res.status(401).send({ message: "token invalido" });
	}
	jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(401).send({ message: `Erro: ${err.name} ás ${err.expiredAt}`});
		}
		req.user = user;
		next();
	});
};

module.exports = {
	generateToken,
	authUser,
};
