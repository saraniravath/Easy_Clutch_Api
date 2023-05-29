import express from 'express'
import { listPackagesHandler, updatePackagesHandler } from './handlers/package.js';
import { deleteVehiclesHandler, insertVehiclesHandler, listVehiclesHandler, updateVehiclesHandler } from './handlers/vehicle.js';


const app = express();
app.use(express.json())
const port = 5000;


app.get("/packages", listPackagesHandler)

app.put("/packages/:id", updatePackagesHandler)


app.get("/vehicles", listVehiclesHandler)

app.put("/vehicles/:id", updateVehiclesHandler)

app.post("/vehicles", insertVehiclesHandler)

app.delete('/vehicles/:id', deleteVehiclesHandler)


app.listen(port,() => {
    console.log("port no:5000");
    })