require("dotenv").config({ path: "./.env" });
const express = require("express");
const gates = require("./routes/gates.routes");
const cors = require("cors");
const compress = require("compression");

const port = process.env.PORT_GATE;
const host = process.env.HOST_NAME;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compress())

app.use("/", gates);

app.listen(port, host, () => {
	console.log(`Rodando gateway http://${host}:${port}`);
});
