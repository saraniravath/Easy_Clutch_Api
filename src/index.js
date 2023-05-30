import express from 'express';
import { deleteVehiclesHandler, insertVehiclesHandler, listVehiclesHandler, updateVehiclesHandler } from './handlers/vehicle.js';
import { listPackagesHandler, updatePackagesHandler, verifyPackagePaymentHandler } from './handlers/package.js';
import { loginHandler, otpVerificationHandler, traineeRegisterHandler } from './handlers/trainee.js';
import cors from 'cors';
import { traineeAuth, trainerAuth } from './middleware/auth.js';
import { trainerLoginHandler } from './handlers/trainer.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json())
const port = process.env.API_HOST_PORT;


app.get("/packages", listPackagesHandler)

app.put("/packages/:id", updatePackagesHandler)

app.post('/packages/:packageId/verify', trainerAuth, verifyPackagePaymentHandler)

app.get("/vehicles", listVehiclesHandler)

app.put("/vehicles/:id", updateVehiclesHandler)

app.post("/vehicles", insertVehiclesHandler)

app.delete('/vehicles/:id', deleteVehiclesHandler)


app.post('/trainees/register', traineeRegisterHandler)
app.post('/trainees/register/verify', otpVerificationHandler)
app.post(`/trainees/login`, loginHandler)
app.post('/trainer/login', trainerLoginHandler)


app.listen(port, () => {
    console.log("Listening on port", port);
})