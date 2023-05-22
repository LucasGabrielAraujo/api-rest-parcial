const express = requiere('express')
const vehiculosController = require("../controllers/vehiculos.controller")

const router = express.Router()

router.get("/api/reservas/", vehiculosController.getAllVehiculos)