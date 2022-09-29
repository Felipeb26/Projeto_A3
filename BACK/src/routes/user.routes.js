const route = require("express").Router();
const { addUser, getAll, getById, updateUser,deleteUser , getUserForLogin} = require("../controller/user.control");
const { authUser} = require("../utils/token_jwt");
const cache = require("../config/cache");

route.post("/login", getUserForLogin);

route.get("/users",authUser,cache(300), getAll);

route.get("/user/:id", authUser, cache(300), getById);

route.post("/users", authUser,cache(300), addUser);

route.put("/user/:id", authUser,cache(300), updateUser);

route.delete("/user/:id", authUser,cache(300), deleteUser);

module.exports = route;