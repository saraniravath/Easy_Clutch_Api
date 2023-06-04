import { trainerLoginController, deleteLeaveController, insertLeaveController, listLeaveController, updateLeaveController} from "../controllers/trainer.js";


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
        res.status(500).json({ Message: "Login Failed" })
    }
    catch (e) {
        console.log("An unexpected error occured while login ", e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }

}

export const listLeaveHandler = async (req, res) => {
    try {
        const id = req.query.id
        const date = req.query.date
        const fnOrAn = req.query.fnOrAn
        const response = await listLeaveController(id, date, fnOrAn)
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
        const updated = await updateLeaveController(id, date, fnOrAn)
        if (!updated) {
            res.status(400).json({ errorMessage: "Invalid request" })
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
        const inserted = await insertLeaveController(date, fnOrAn)
        if (!inserted) {
            res.status(400).json({ errorMessage: "Invalid request" })
            return
        }
        res.status(200).json({ successMessage: "Leave marked successfully" })
    }
    catch (error) {
        console.log("An unexpected error occured while marking leave", error.message)
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