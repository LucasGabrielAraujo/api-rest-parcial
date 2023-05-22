const express = require('express')
const reservasController = require("../controllers/reservas.controller")

const router = express.Router()

router.get("/", reservasController.getAllReservas)

module.exports = {router}