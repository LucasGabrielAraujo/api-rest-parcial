const { json } = require("body-parser")
const reservas = require("../../data/reservas.json")
const vehiculos = require("../../data/vehiculos.json")

const getAllReservas = (req, res) => {
    res.status(200).json(reservas)
}

const getReservaById = (req, res) => {
    const id = req.params.id
    const resultado = reservas.find(reserva => reserva.id == id)
    if (resultado) {
        res.status(200).json(resultado)
    } else {
        res.status(404).json({ mensaje: `La reserva con id ${id} no fue encontrada` })
    }
}

const deleteById = (req, res) => {
    const id = req.params.id
    const indice = reservas.findIndex(reserva => reserva.id == id)

    if (indice == -1) {
        res.status(404).json({
            resultado: `La operacion no pudo ser realizada`,
            mensaje: `No pudo encontrarse la reserva ${id}`
        })
    } else {
        const reserva = reservas[indice]
        const resultado = reservas.splice(indice, 1)
        res.status(200).json({
            resultado: "La operacion se realizo con exito",
            reserva: reserva
        })
    }
}

const createReserva = (req, res) => {
    const reservasData = req.body
    const disponible = vehiculos.filter(vehiculo => vehiculo.habilitado == true && vehiculo.capacidad >= reservasData.cantPersonas && vehiculo.autonomiaKms >= reservasData.distancia)
    console.log(disponible)
    if (disponible.length > 0) {
        const arraySinHabilitado = disponible.map(elemento => {
            const { habilitado, ...resto } = elemento
            return resto
        })
        const reservado = arraySinHabilitado[0]
        reservasData.vehiculo = reservado
        reservasData.id = reservas.reduce((maxId, objeto) => {
            return Math.max(maxId, objeto.id);
        }, -Infinity) + 1
        console.log(reservasData)
        //validacion fecha
        if (validarFecha(reservasData.fecha)) {
            reservasData.fecha = validarFecha(reservasData.fecha)
            disponible[0].habilitado = false
            vehiculos.push(disponible[0])
            reservas.push(reservasData)
            res.status(201).json({
                mensaje: `Reserva creada correctamente`,
                reservasData: reservasData
            })
        } else {
            res.status(400).json({
                mensaje: "La fecha ingresada no es valida"
            })
        }
    } else {
        res.status(404).json({
            mensaje: `No se encontro vehiculo compatible`
        })
    }
    function validarFecha(fecha) {
        const fechaString = fecha.toString()
        const anio = fechaString.substring(0, 4)
        const mes = fechaString.substring(4, 6)
        const dia = fechaString.substring(6, 8)

        const date = new Date(anio, mes - 1, dia);

        if (
            date.getFullYear() == anio &&
            date.getMonth() + 1 == mes &&
            date.getDate() == dia
        ) {
            return `${anio}${dia}${mes}`
        } else {
            return false
        }
    }

}


module.exports = {
    getAllReservas,
    getReservaById,
    createReserva,
    deleteById
}