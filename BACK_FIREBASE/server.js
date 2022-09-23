require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerDoc = require("./swagger.json");
const port = process.env.PORT;
const host = process.env.HOST_NAME;



const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))



const userRoute = require("./src/routes/user.routes");
app.use(userRoute);

app.get("/heelo", (req, res) => {
	return res.send({ message: "Gateway is running" });
});

const cron = require("./src/utils/timer_delete");
app.listen(port, host, () => {
	console.log(`Aplicação rodando na url: http://${host}:${port}`);
	cron.run();
});
