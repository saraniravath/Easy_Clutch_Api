import express from 'express';
import cors from 'cors';
import { deleteVehiclesHandler, getAvailableVehicleTypesForUserHandler, getAvailableVehiclesInSessionHandler, insertVehiclesHandler, listVehiclesHandler, updateVehiclesHandler } from './handlers/vehicle.js';
import { addScheduleHandler, getScheduleHandler, listPackagesHandler, listPaymentNotificationsHandler, notifyPaymentHandler, updatePackagesHandler, verifyPackagePaymentHandler } from './handlers/package.js';
import { getBookingListHandler, loginHandler, otpVerificationHandler, traineeRegisterHandler, getTraineeListHandler } from './handlers/trainee.js';
import { commonAuth, traineeAuth, trainerAuth } from './middleware/auth.js';
import { deleteLeaveHandler, insertLeaveHandler, listLeaveHandler, trainerLoginHandler, updateLeaveHandler } from './handlers/trainer.js';
import env from './config/load.js';
import { checkDatabaseConnection } from './util/mysql.js';

const app = express();
app.use(express.json())
app.use(cors());


app.get("/packages", commonAuth, listPackagesHandler)
app.put("/packages/:id", trainerAuth, updatePackagesHandler)

app.put('/packages/:packageId/verify', trainerAuth, verifyPackagePaymentHandler)
app.post('/packages/type/payment/notify', traineeAuth, notifyPaymentHandler)
app.get('/packages/payments', trainerAuth, listPaymentNotificationsHandler)

app.get('/schedules/sessions', commonAuth, getScheduleHandler)

app.get("/vehicles", commonAuth, listVehiclesHandler)
app.put("/vehicles/:id", trainerAuth, updateVehiclesHandler)
app.post("/vehicles", trainerAuth, insertVehiclesHandler)
app.delete('/vehicles/:id', trainerAuth, deleteVehiclesHandler)
app.post('/vehicles/:vehicleId/schedule', traineeAuth, addScheduleHandler)
app.get('/vehicles/available', traineeAuth, getAvailableVehiclesInSessionHandler)
app.get('/vehicles/types/available', traineeAuth, getAvailableVehicleTypesForUserHandler)

app.get("/leaves", commonAuth, listLeaveHandler)
app.put("/leaves/:id", trainerAuth, updateLeaveHandler)
app.post("/leaves", trainerAuth, insertLeaveHandler)
app.delete('/leaves/:id', trainerAuth, deleteLeaveHandler)

app.get(`/trainees`, trainerAuth, getTraineeListHandler)
app.post('/trainees/register', traineeRegisterHandler)
app.post('/trainees/register/verify', otpVerificationHandler)
app.post(`/trainees/login`, loginHandler)
app.get(`/trainees/bookings`, commonAuth, getBookingListHandler)

app.post('/trainers/login', trainerLoginHandler)

app.use((req, res, next) => {
    res.status(404).json({ errorMessage: "URL not found" })
})

const startServerIfHealthy = async () => {
    try {
        await checkDatabaseConnection()
        app.listen(env.serverPort, () => {
            console.log("Listening on port ", env.serverPort);
        })
    } catch (exception) {
        console.log("Error while starting server ", exception.message)
    }
}

startServerIfHealthy();
