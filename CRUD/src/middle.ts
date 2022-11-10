import express from "express"
import morgan from "morgan";
import cors from "cors"
import { loggs } from "./config/log.config"
var rfs = require("rotating-file-stream"); // version 2.x
import path from "path";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({ origin: "*" }))


import { route } from "./routes/all.routes"
app.use(route)
app.use(morgan(loggs, { stream: accessLogStream }))

var accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log"),
});
