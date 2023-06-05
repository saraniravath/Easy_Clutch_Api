import express from 'express';
import { deleteVehiclesHandler, insertVehiclesHandler, listVehiclesHandler, updateVehiclesHandler } from './handlers/vehicle.js';
import { addScheduleHandler, getScheduleHandler, listPackagesHandler, listPaymentNotificationsHandler, notifypaymentHandler, updatePackagesHandler, verifyPackagePaymentHandler } from './handlers/package.js';
import { getBookingListHandler, loginHandler, otpVerificationHandler, traineeRegisterHandler } from './handlers/trainee.js';
import cors from 'cors';
import { commonAuth, traineeAuth, trainerAuth } from './middleware/auth.js';
import dotenv from 'dotenv';
import { deleteLeaveHandler, insertLeaveHandler, listLeaveHandler, trainerLoginHandler, updateLeaveHandler } from './handlers/trainer.js';
dotenv.config();


const app = express();
app.use(express.json())
const port = process.env.API_HOST_PORT;
app.use(cors());


app.get("/packages", commonAuth, listPackagesHandler)
app.put("/packages/:id", trainerAuth, updatePackagesHandler)
app.post('/packages/:packageId/verify', trainerAuth, verifyPackagePaymentHandler)
app.post('/packages/type/payment/notify', traineeAuth, notifypaymentHandler)
app.get('/packages/payments', trainerAuth, listPaymentNotificationsHandler)
app.post('/packages/:packageId/sessions/schedule', traineeAuth, addScheduleHandler)
app.get('/schedules/sessions', commonAuth, getScheduleHandler)

app.get("/vehicles", commonAuth, listVehiclesHandler)
app.put("/vehicles/:id", trainerAuth, updateVehiclesHandler)
app.post("/vehicles", trainerAuth, insertVehiclesHandler)
app.delete('/vehicles/:id', trainerAuth, deleteVehiclesHandler)

app.get("/leave", listLeaveHandler)
app.put("/leave/:id", updateLeaveHandler)
app.post("/leave", insertLeaveHandler)
app.delete('/leave/:id', deleteLeaveHandler)


app.post('/trainees/register', traineeRegisterHandler)
app.post('/trainees/register/verify', otpVerificationHandler)
app.post(`/trainees/login`, loginHandler)
app.get(`/trainees/bookings`, trainerAuth, getBookingListHandler)

app.post('/trainer/login', trainerLoginHandler)


app.listen(port, () => {
    console.log("Listening on port", port);
})