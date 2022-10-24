const { unlinkSync } = require("fs");
let { exec, spawn } = require("child_process");

let os = require("os");

const system = os.platform(); // "win32"

// console.log(system.startsWith("win"));

function deleteLogs() {
	console.log(
		"todos os arquios de log seram deletados ao iniciar projeto de forma geral!"
	);
	try {
		let logs = [
			`${__dirname}/BACK/log/access.log`,
			`${__dirname}/MAIL/log/access.log`,
		];

		logs.forEach((it) => {
			unlinkSync(it);
			let pack = it.substring(
				it.lastIndexOf("/log") - 5,
				it.lastIndexOf("/log")
			);
			pack = pack.replace("/", "");
			it = it.substring(it.lastIndexOf("/") + 1);
			console.log(`Arquivo: ${it} deletado da PASTA: ${pack}`);
		});
	} catch (error) {
		console.log("sem arquivo de log no momento!!");
	}
}

deleteLogs();

// if(system.startsWith("win")){
// 	exec(`start "" "${__dirname}/page_login"`).;
// 	exec("ng serve", function (err, stdout, stderr) {
// 		if (err) {
// 			console.log(`Erro: ${err}`);
// 		} else {
// 			console.log(stdout);
// 		}
// 	});
// }else{
// 	exec(`start "" "${__dirname}/page_login"`);
// 	exec("ng serve", function (err, stdout, stderr) {
// 		if (err) {
// 			console.log(`Erro: ${err}`);
// 		} else {
// 			console.log(stdout);
// 		}
// 	});
// }


// console.log(`${__dirname}/page_login`);
