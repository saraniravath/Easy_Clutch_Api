import { getTrainerByUsername, deleteLeaveModel, insertLeaveModel, listLeaveModel, updateLeaveModel } from "../models/trainer.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const trainerLoginController = async (loginDetails) => {
    const trainer = await getTrainerByUsername(loginDetails.username);
    const username = loginDetails.username;
    if (loginDetails && trainer && (await bcrypt.compare(loginDetails.password, trainer.password))) {
        // Create token
        const token = jwt.sign(
            { username, userId: trainer.id, userType: "trainer" },
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

export const listLeaveController = (id, date, FN_or_AN) => {
    return listLeaveModel(id, date, FN_or_AN)
}

export const updateLeaveController = (id, date, FN_or_AN) => {
    return updateLeaveModel(id, date, FN_or_AN)
}

export const insertLeaveController = (date, FN_or_AN) => {
    return insertLeaveModel(date, FN_or_AN)
}

export const deleteLeaveController = (id, date, FN_or_AN) => {
    return deleteLeaveModel(id, date, FN_or_AN)
}