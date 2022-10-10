require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compress = require("compression");

//env variable
let port = process.env.PORT;
const host = process.env.HOST;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compress())


//paths

const gates = require("./src/routes/gates.routes");
app.use("/", gates);

app.get("/", (req, res) => {
	return res.send({ message: "Gateway is running" });
});



//ports - host
if(port.match("3000")){
	port = port.replace("3000", "3001")
}

app.listen(port, () => {
	console.log(`Rodando gateway http://${host}:${port}`);
});