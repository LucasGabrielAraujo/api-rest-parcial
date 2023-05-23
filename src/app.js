const express = require("express");
const app = express();
const PORT = 3000;

const reservasRouter = require("./routes/reservas.route");
const vehiculosRouter = require("./routes/vehiculos.route")

app.use(express.json());
app.use("/api", reservasRouter.router);
app.use("/api", vehiculosRouter.router);

app.listen(PORT, () => { console.log(`App listen in port ${PORT}`) })