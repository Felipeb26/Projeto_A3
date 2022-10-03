require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const compress = require("compression");
const swaggerUi = require("swagger-ui-express");

const swaggerDoc = require("./swagger.json");
const port = process.env.PORT;
const host = process.env.HOST;

const app = express();
app.use(express.json());
app.use(compress());
app.use(cors({ origin: "*" }));


//log usado
const loggs = require("./server.logs");
app.use(loggs)

//endpoints usados
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const userRoute = require("./src/routes/user.routes");
app.use(userRoute);

app.get("/", (req, res) => {
	return res.send({ message: "Back is running" });
});


// cron para implementar  e informacao que tá rodando 
const cron = require("./src/utils/timer_delete");
app.listen(port, host, () => {
	console.log(`Rodando crud em http://${host}:${port}`);
	cron.run();
});
