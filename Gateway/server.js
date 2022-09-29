require("dotenv").config({ path: "./.env" });
const express = require("express");
const gates = require("./routes/gates.routes");
const cors = require("cors");
const compress = require("compression");

let port = process.env.PORT;
const host = process.env.HOST;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compress())

app.use("/", gates);

app.get("/", (req, res) => {
	return res.send({ message: "Gateway is running" });
});


if(port.match("3000")){
	port = port.replace("3000", "3001")
}

app.listen(port, () => {
	console.log(`Rodando gateway http://${host}:${port}`);
});