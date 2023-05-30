import { trainerLoginController } from "../controllers/trainer.js";


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