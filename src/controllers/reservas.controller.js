const reservas = require("../../data/reservas.json")
const vehiculos = require("../../data/vehiculos.json")

const getAllReservas = (req, res) =>{
    res.status(200).json(reservas)
}

const getReservaById = (req, res) =>{
    const id = req.params.id
    const resultado = reservas.find(reserva => reserva.id == id)
    if(resultado){
        res.status(200).json(resultado)
    }else{
        res.status(404).json({mensaje: `La reserva con id ${id} no fue encontrada`})
    }
}

const deleteById = (req, res) =>{
    const id=req.params.id
    const indice = reservas.findIndex(reserva => reserva.id == id)

    if (indice==-1) {
        res.status(404).json({
            resultado: `La operacion no pudo ser realizada`,
            mensaje: `No pudo encontrarse la reserva ${id}`
        })
    }else{
        const reserva = reservas[indice]
        const resultado = reservas.splice(indice,1)
        res.status(200).json({
            resultado: "La operacion se realizo con exito",
            reserva: reserva
        })
    }
}

const createReserva = (req, res) => {
    const reservasData = req.body
    const disponible = vehiculos.find(vehiculo => vehiculo)
    if (disponible) {
        if(reservasData.cliente == false || reservasData.cantPersonas == false || reservasData.distancia == false || reservasData.fecha == false){
            res.status(400).json({
                mensaje: `No se pudo generar reserva`
            })
        }else if(vehiculos.disponible){
            reservas.push(reservasData)
            res.status(201).json({mensaje: `La reserva se realizo con exito`})
        }
    }


}


module.exports = {
    getAllReservas,
    getReservaById,
    createReserva
}