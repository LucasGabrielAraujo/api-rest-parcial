const express = require('express')
const vehiculosController = require("../controllers/vehiculos.controller")

const router = express.Router()

router.get("/vehiculos/", vehiculosController.getAllVehiculos)
router.get("/vehiculos/:patente", vehiculosController.getVehiculoByPatente)
router.post("/vehiculos/", vehiculosController.createVehiculo)
router.put("/vehiculos/:patente", vehiculosController.updateVehiculoByPatente)

module.exports = { router }