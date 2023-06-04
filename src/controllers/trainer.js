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

export const listLeaveController = (date, fnOrAn) => {
    return listLeaveModel(date, fnOrAn)
}

export const updateLeaveController = async (id, date, fnOrAn) => {
    const checkLeave = await listLeaveModel(date, fnOrAn)
    if (checkLeave[0]) {
        return 0
    } else
        return updateLeaveModel(id, date, fnOrAn);
}

export const insertLeaveController = async (date, fnOrAn) => {
    const checkLeave = await listLeaveModel(date, fnOrAn)
    if (checkLeave[0]) {
        return 0
    } else
        return insertLeaveModel(date, fnOrAn);

}

export const deleteLeaveController = (id) => {
    return deleteLeaveModel(id)
}