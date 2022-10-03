const route = require("express").Router();
const {
    getAllPaginate,
	getAll,
	getById,
	addUser,
	updateUser,
	deleteUser,
	getUserForLogin,
} = require("../controller/user.control");

const { authUser } = require("../utils/token_jwt");
const cache = require("../config/cache");

route.post("/login", getUserForLogin);

route.get("/users-page", authUser, cache(300), getAllPaginate);

route.get("/users", authUser, cache(300), getAll);

route.get("/user/:id", authUser, cache(300), getById);

route.post("/users", authUser, cache(300), addUser);

route.put("/user/:id", authUser, cache(300), updateUser);

route.delete("/user/:id", authUser, cache(300), deleteUser);

module.exports = route;
