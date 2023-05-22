const express = require("express")
const app = express()
const PORT = 3000

const reservasRouter = require("./routes/reservas.route")

app.use(express.json())
app.use("/reservas", reservasRouter.router);

app.listen(PORT, ()=>{console.log(`App listen in port ${PORT}`)})