require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compress = require("compression");
const helmet = require("helmet");
var Module = require("module");
var fs = require("fs");

Module._extensions[".png"] = function (module, fn) {
	var base64 = fs.readFileSync(fn).toString("base64");
	module._compile(
		'module.exports="data:image/jpg;base64,' + base64 + '"',
		fn
	);
};
//env variable
let port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compress());
app.use(helmet());

const path = __dirname;
//paths
const { reg, route , crudIsGood, emailIsGood} = require("./src/routes/gates.routes");
const crud = require(`${path}/views/img/crud.png`);
const email = require(`${path}/views/img/message.png`);

app.set("view engine", "ejs");
app.use(express.static(path));

app.get("/main", async (req, res) => {
	res.render("main.ejs", {
		services: reg.services,
		img: { crud: crud, email: email },
		crudIsGood, emailIsGood
	});
});

app.use("/", route);

app.get("/", (req, res) => {
	return res.send({ message: "Gateway is running" });
});

//ports - host
if (port.match("3000")) {
	port = port.replace("3000", "3001");
}

app.listen(port, () => {
	console.log(`Rodando gateway http://${host}:${port}`);
});
