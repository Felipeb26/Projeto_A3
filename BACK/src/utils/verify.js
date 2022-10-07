const role_list = require("../config/roles_list");

function verifyRoles(valor) {
	try {
		valor = parseInt(valor);
		if (role_list.ADMIN == valor) {
			return role_list.ADMIN;
		} else if (role_list.USER_ADMIN == valor) {
			return role_list.USER_ADMIN;
		} else {
			return role_list.USER;
		}
	} catch (error) {
		console.log("erro com relacao a roles");
		console.log(error.message);
	}
}


// date functions
function verifyDate(valor) {
	try {
		let data = new Date(valor);
        if(isValidDate(data)){
            return data;
        }else{
			return valor;
		}
	} catch (error) {
		console.log(error.message);
	}
}

function toDate(valor){
	let data = new Date(valor);
	return data;
}

const isValidDate = (d) => {
	return d instanceof Date && !isNaN(d);
};

module.exports = {
	verifyRoles,
	verifyDate,
	toDate,
	isValidDate,
};
