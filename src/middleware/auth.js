import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()


export const traineeAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    const userType = req.headers["user-type"]
    if (!token || userType != "trainee") {
        return res.status(403).json({ errorMessage: 'Invalid token or user-type' });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);
        if (decoded.userType === 'trainee') {
            req.user = decoded;
            return next();
        }
    }
    catch (err) {
        return res.status(401).json({ errorMessage: 'Invalid or expired token' });
    }
    return res.status(403).json({ errorMessage: 'Invalid token or user-type' });
};


export const trainerAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    const userType = req.headers["user-type"]
    if (!token || userType != "trainer") {
        return res.status(403).json({ errorMessage: "Invalid token or userType" });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);
        if (decoded.userType === 'trainer') {
            req.user = decoded;
            return next();
        }
    } catch (err) {
        return res.status(401).json({ errorMessage: "Invalid Token" });
    }
    return res.status(403).json({ errorMessage: 'Invalid token or user-type' });
};


export const commonAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    const userType = req.headers["user-type"]
    if (!token || (userType != "trainer" && userType != "trainee")) {
        return res.status(403).json({ errorMessage: "Invalid token or userType" });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).json({ errorMessage: "Invalid Token" });
    }
    return next();
};
