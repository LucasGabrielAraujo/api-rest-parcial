const vehiculos = require("../../data/vehiculos.json")

const getAllVehiculos = (req, res) => {
    res.status(200).json(vehiculos)
}

const getVehiculoByPatente = (req, res) => {
    const patente = req.params.patente
    const resultado = vehiculos.find(vehiculo => vehiculo.patente == patente)
    if (resultado) {
        res.status(200).json(resultado)
    } else {
        res.status(404).json({ mensaje: `El vehiculo con patente ${patente} no fue encontrado` })
    }
}

const updateVehiculoByPatente = (req, res) => {
    const patente = req.params.patente
    const update = req.body
    const indice = vehiculos.findIndex(vehiculo => vehiculo.patente == patente)

    if (indice >= 0) {
        if (typeof update.habilitado !== 'boolean') {
            res.status(400).json({
                mensaje: "Tipo de dato no valido, ingrese boolean"
            })
        }else{vehiculos[indice].habilitado = update.habilitado}
        if (!(update.capacidad <= 10 && update.capacidad >= 0)) {
            res.status(400).json({
                mensaje: "Fuera del rango de capacidad"
            })
        }else{vehiculos[indice].capacidad = update.capacidad}
        if (update.autonomiaKms <= 0) {
            res.status(400).json({
                mensaje: "Fuera del rango de autonomia"
            })
        }else{vehiculos[indice].autonomiaKms = update.autonomiaKms}
        res.status(201).json({ vehiculos: vehiculos[indice] })
    } else {
        res.status(404).json({
            mensaje: `No se encontro el vehiculo con patente ${patente}`
        })
    }
}

const createVehiculo = (req, res) => {
    const vehiculoData = req.body
    const existe = vehiculos.find(vehiculo => vehiculo.patente == vehiculoData.patente)
    if (!existe) {
        if (verificarPatente(vehiculoData)) {
            if (vehiculoData.capacidad > 0 && vehiculoData.capacidad < 11) {
                if (vehiculoData.autonomiaKms > 0) {
                    vehiculoData.habilitado=false
                    vehiculos.push(vehiculoData)
                    res.status(201).json({
                        mensaje: `El vehiculo con patente ${vehiculoData.patente}, fue creado correctamente`,
                        vehiculo: vehiculoData
                    })
                } else {
                    res.status(400).json({
                        mensaje: "Autonomia fuera de limite"
                    })
                }
            } else {
                res.status(400).json({
                    mensaje: "Capacidad fuera de limite"
                })
            }
        } else {
            res.status(400).json({
                mensaje: "Patente no valida"
            })
        }
    } else {
        res.status(400).json({
            mensaje: `El vehiculo con patente ${vehiculoData.patente} ya existe`
        })
    }

    function verificarPatente(vehiculoData) {
        if (typeof vehiculoData.patente === 'string' && vehiculoData.patente.length === 7) {
            const formatoRegex = /^[A-Z]{2}\d{3}[A-Z]{2}$/;
            return formatoRegex.test(vehiculoData.patente);
          }
          
          return false;
      }
}

module.exports = {
    getAllVehiculos,
    getVehiculoByPatente,
    updateVehiculoByPatente,
    createVehiculo
}