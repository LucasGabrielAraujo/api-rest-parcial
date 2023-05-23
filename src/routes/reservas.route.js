const express = require('express')
const reservasController = require("../controllers/reservas.controller")

const router = express.Router()

router.get("/reservas", reservasController.getAllReservas)
router.get("/reservas/:id", reservasController.getReservaById)
router.delete("/reservas/:id", reservasController.deleteById)
router.post("/reservas", reservasController.createReserva)

module.exports = { router }