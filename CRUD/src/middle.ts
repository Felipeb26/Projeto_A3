import cors from "cors";
import express from "express";
import { logger } from "../log.config";

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({ origin: "*" }))


import { route } from "./routes/all.routes";
app.use(route)

app.use(logger)