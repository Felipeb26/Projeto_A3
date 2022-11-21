const route = require("express").Router();
const controller = require("../controller/email.controller");

route.post("/preview", controller.previewPDF);

route.post("/bem-user", controller.boasVindasController);

route.post("/bem-doc", controller.boasVindasDocController);

route.post("/agendamento", controller.agendamentoController);

route.post("/medicamento", controller.medicamentoController);

route.post("/atestado", controller.atestadoController);

route.post("/index", controller.send);

module.exports = route;