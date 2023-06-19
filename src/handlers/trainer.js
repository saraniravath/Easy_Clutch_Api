import {
    trainerLoginController, deleteLeaveController, insertLeaveController,
    listLeaveController, updateLeaveController, trainerRegisterController, getTrainersController
} from "../controllers/trainer.js";


export const trainerLoginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send("All input is required");
            return;
        }
        const success = await trainerLoginController(req.body);
        if (success) {
            res.status(200).json(success)
            return success;
        }
        res.status(401).json({ Message: "Login Failed" })
    }
    catch (e) {
        console.log("An unexpected error occured while login ", e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }

}

export const listLeaveHandler = async (req, res) => {
    try {
        const date = req.query.date
        const fnOrAn = req.query.fnOrAn
        const response = await listLeaveController(date, fnOrAn)
        res.status(200).json(response)
    }
    catch (error) {
        console.log("An unexpected error occured while listing leave ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' })
    }
}

export const updateLeaveHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const date = req.body.date;
        const fnOrAn = req.body.fnOrAn;
        if (fnOrAn !== "FN" && fnOrAn !== "AN") {
            res.status(400).json({ errorMessage: "fnOrAn should be either FN or AN" })
            return
        }
        const updated = await updateLeaveController(id, date, fnOrAn)
        if (updated === 0) {
            res.status(400).json({ errorMessage: "This session has already being marked as leave" })
            return
        }
        if (updated === -1) {
            res.status(400).json({ errorMessage: "Invalid leave id" })
            return
        }
        res.status(200).json({ successMessage: "Leave updated" })
    }
    catch (error) {
        console.log("An unexpected error occured while updating leave ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}

export const insertLeaveHandler = async (req, res) => {
    try {
        const date = req.body.date;
        const fnOrAn = req.body.fnOrAn;
        if (fnOrAn !== "FN" && fnOrAn !== "AN") {
            res.status(400).json({ errorMessage: "fnOrAn should be either FN or AN" })
            return
        }
        const inserted = await insertLeaveController(date, fnOrAn)
        if (inserted === 0) {
            res.status(400).json({ errorMessage: "This session has already being marked as leave" })
            return
        }
        res.status(200).json({ successMessage: "Leave marked successfully" })
    }
    catch (error) {
        console.log("An unexpected error occured while marking leave ", error.message)
        res.status(500).json({ errorMessage: "An unexpected error occured. Check server logs" });
    }
}

export const deleteLeaveHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await deleteLeaveController(id)
        if (!deleted) {
            res.status(404).json({ errorMessage: "Leave with this id does not exist" })
            return
        }
        res.status(200).json({ successMessage: "Leave deleted successfully" })
    }
    catch (error) {
        console.log("An unexpected error occured while deleting leave", error.message)
        res.status(500).json({ errorMessage: "An unexpected error occured. Check server logs" });
    }
}


export const trainerRegisterHandler = async (req, res) => {
    try {

        const { username, firstName, lastName, password } = req.body;
        if (!(username && password && firstName && lastName)) {
            res.status(400).json({ errorMessage: "All input is required" });
            return;
        }

        const register = await trainerRegisterController(req.body);
        if (register) {
            res.status(200).json({ successMessage: "Trainer registered successfully" })
            return;
        }
        res.status(500).json({ Message: "Username already taken" })
    }
    catch (error) {
        console.log("An unexpected error occured while registering trainer ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }

}

export const getTrainersHandler = async (req, res) => {
    try {
        const response = await getTrainersController()
        res.status(200).json(response)
    }
    catch (error) {
        console.log("An unexpected error occured while listing Trainers ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' })
    }
}