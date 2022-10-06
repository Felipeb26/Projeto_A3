require("dotenv").config();
const compress = require("compression");
const express = require("express");
const cors = require("cors");

let port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(express.json());
app.use(compress());
app.use(cors({ origin: "*" }));

const engine = require("./src/routes/engine.routes");
app.use("/index", engine);

app.get("/", (req, res) => {
	return res.send({ message: "Mail is running" });
});


//log usado
const loggs = require("./server.logs");
app.use(loggs)

port = port.match("3000") ? port.replace("3000","3003") : port;

app.listen(port, () => {
	console.log(`Rodando email em http://${host}:${port}`);
});
