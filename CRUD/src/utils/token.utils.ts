require("dotenv").config();
import { Response } from "express";
import * as jwt from "jsonwebtoken";
const secret = process.env.ACESS_TOKEN_SECRET;

export const generateToken = (pass: any) => {
    const acessToken = jwt.sign({ id: pass }, secret!, { expiresIn: 900000 });
    return acessToken;
};

export const authUser = async (req: any, res: Response, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).send({ message: "unathorized" });
    }
    if (authHeader.toLowerCase().indexOf("bearer") == -1) {
        return res.status(401).send({ erro: "token invalido" });
    }
    try {
        await jwt.verify(token, process.env.ACESS_TOKEN_SECRET as string);
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ erro: "token is expired" });
    }
};