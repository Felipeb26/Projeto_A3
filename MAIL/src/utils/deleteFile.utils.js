const fs = require("fs");

const deletes = (name, pasta) => {
	try {
		fs.unlinkSync(name);
		fs.rmdirSync(pasta);
		console.log("pasta e arquivo deletado");
		return 0;
	} catch (error) {
		console.log("error ao deletar arquivo");
		console.log(error.message);
		return 1;
	}
};

module.exports = {
	deletes,
};
