import { getTrainerByUsername } from "../models/trainer.js";
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