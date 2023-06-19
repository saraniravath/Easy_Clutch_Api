import express from 'express';
import cors from 'cors';
import {
    deleteVehiclesHandler, getAvailableVehicleTypesForUserHandler, getAvailableVehiclesInSessionHandler,
    insertVehiclesHandler, listVehiclesHandler, updateVehiclesHandler
} from './handlers/vehicle.js';
import {
    addScheduleHandler, createCheckoutSession, getScheduleHandler, handleWebhookEvent, listPackagesHandler,
    listPaymentNotificationsHandler, notifyPaymentHandler, updatePackagesHandler, verifyPackagePaymentHandler
} from './handlers/package.js';
import {
    getBookingListHandler, loginHandler, otpVerificationHandler, traineeRegisterHandler, getTraineeListHandler,
    updatePasswordOtpHandler, updatePasswordHandler
} from './handlers/trainee.js';
import { commonAuth, traineeAuth, trainerAuth } from './middleware/auth.js';
import {
    deleteLeaveHandler, getTrainersHandler, insertLeaveHandler, listLeaveHandler, trainerLoginHandler,
    trainerRegisterHandler, updateLeaveHandler
} from './handlers/trainer.js';
import env from './config/load.js';
import { checkDatabaseConnection } from './util/mysql.js';

const app = express();
app.use(cors());

app.get("/packages", commonAuth, listPackagesHandler)
app.put("/packages/:id", express.json(), trainerAuth, updatePackagesHandler)

app.put('/packages/:packageId/verify', express.json(), trainerAuth, verifyPackagePaymentHandler)
app.post('/packages/type/payment/notify', express.json(), traineeAuth, notifyPaymentHandler)
app.get('/packages/payments', trainerAuth, listPaymentNotificationsHandler)

app.post('/packages/:packageId/checkout/session', express.json(), traineeAuth, createCheckoutSession)
app.post('/payment/event', express.raw({ type: 'application/json' }), handleWebhookEvent)

app.get('/schedules/sessions', commonAuth, getScheduleHandler)

app.get("/vehicles", commonAuth, listVehiclesHandler)
app.put("/vehicles/:id", express.json(), trainerAuth, updateVehiclesHandler)
app.post("/vehicles", express.json(), trainerAuth, insertVehiclesHandler)
app.delete('/vehicles/:id', trainerAuth, deleteVehiclesHandler)
app.post('/vehicles/:vehicleId/schedule', express.json(), traineeAuth, addScheduleHandler)
app.get('/vehicles/available', traineeAuth, getAvailableVehiclesInSessionHandler)
app.get('/vehicles/types/available', traineeAuth, getAvailableVehicleTypesForUserHandler)

app.get("/leaves", commonAuth, listLeaveHandler)
app.put("/leaves/:id", express.json(), trainerAuth, updateLeaveHandler)
app.post("/leaves", express.json(), trainerAuth, insertLeaveHandler)
app.delete('/leaves/:id', trainerAuth, deleteLeaveHandler)

app.get(`/trainees`, trainerAuth, getTraineeListHandler)
app.post('/trainees/register', express.json(), traineeRegisterHandler)
app.post('/trainees/register/verify', express.json(), otpVerificationHandler)
app.post(`/trainees/login`, express.json(), loginHandler)
app.get(`/trainees/bookings`, commonAuth, getBookingListHandler)

app.post('/trainers/login', express.json(), trainerLoginHandler)
app.post('/trainers/register', express.json(), trainerRegisterHandler)
app.get(`/trainer/details`, getTrainersHandler)

app.post('/forgotpassword', express.json(), updatePasswordOtpHandler)
app.post('/forgotpassword/verify', express.json(), updatePasswordHandler)

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
