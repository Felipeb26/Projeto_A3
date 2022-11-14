require("dotenv").config();
const compress = require("compression");
const express = require("express");
const cors = require("cors");
const swagger_ui = require("swagger-ui-express");
const route = require("./src/routes/engine.routes")

// envs
let port = process.env.PORT;
const host = process.env.HOST;

// configs
const app = express();
app.use(express.json());
app.use(compress());
app.use(cors({ origin: "*" }));

// rotas
const doc = require("./swagger.json")
app.use("/api-docs", swagger_ui.serve, swagger_ui.setup(doc))

app.get("/", (req, res) => {
	return res.send({ message: "Mail is running" });
});

app.use(route)

//log usado
const loggs = require("./server.logs");
app.use(loggs)

port = port.match("3000") ? port.replace("3000","3003") : port;

app.listen(port, () => {
	console.log(`Rodando email em http://${host}:${port}`);
});
