import jwt from "jsonwebtoken";
import {
    addTraineeDetails, checkIfOtpIsValid, getTraineeByUsername,
    getUserByUsername,
    getUserId, storeOtp, updateActive, updateTraineeDetails
} from "../models/trainee.js";
import { sendEmail } from "../util/email.js";
import { generateOTP } from "../util/otp.js";
import bcrypt from "bcrypt";


export const traineeRegisterController = async (traineeDetails) => {
    const { firstName, username } = traineeDetails;
    const traineeExists = await getTraineeByUsername(traineeDetails.username)
    traineeDetails.password = await bcrypt.hash(traineeDetails.password, 10);
    let userId;
    if (traineeExists) {
        if (traineeExists.active)
            return 0;

        userId = traineeExists.id;
        await updateTraineeDetails(traineeDetails, userId);

    }
    else
        userId = await addTraineeDetails(traineeDetails);
    const otp = generateOTP();
    const otpDetails = { otp, userId }
    await storeOtp(otpDetails);
    const emailContent = { firstName, username, otp, subject: "otp verification" }
    await sendEmail(emailContent);
    return true;
}

export const otpVerificationController = async (otpDetails) => {
    const id = await getUserId(otpDetails.username)
    const count = await checkIfOtpIsValid(otpDetails.otp, id);
    if (count) {
        await updateActive(id);
        return true;
    }
    return false;

}


export const loginController = async (loginDetails) => {
    const trainee = await getUserByUsername(loginDetails.username);
    const username = loginDetails.username;
    if (loginDetails && trainee && (await bcrypt.compare(loginDetails.password, trainee.password))) {
        // Create token
        const token = jwt.sign(
            { username, userId: trainee.id, firstName: trainee.firstname, lastName: trainee.lastname, userType: "trainee" },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        const response = {
            token, username
        }
        return response;
    }
    return false;
}


