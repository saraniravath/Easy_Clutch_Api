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

export const listLeaveController = (date, FN_or_AN) => {
    return listLeaveModel(date, FN_or_AN)
}

export const updateLeaveController = async (id, date, FN_or_AN) => {
    const checkLeave = await listLeaveModel(date, FN_or_AN)
    if (checkLeave[0]) {
        return 0
    } else
        return updateLeaveModel(id, date, FN_or_AN);
}

export const insertLeaveController = async (date, FN_or_AN) => {
    const checkLeave = await listLeaveModel(date, FN_or_AN)
    if (checkLeave[0]) {
        return 0
    } else
        return insertLeaveModel(date, FN_or_AN);

}

export const deleteLeaveController = (id, date, FN_or_AN) => {
    return deleteLeaveModel(id, date, FN_or_AN)
}