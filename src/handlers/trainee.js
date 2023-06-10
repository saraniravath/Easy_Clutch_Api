import { getTraineeListController, loginController, otpVerificationController, traineeRegisterController } from "../controllers/trainee.js";

export const traineeRegisterHandler = async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        if (!(username && password && firstName && lastName)) {
            res.status(400).json({ errorMessage: "All input is required" });
            return;
        }

        const register = await traineeRegisterController(req.body);
        if (register) {
            res.status(200).json({ successMessage: "OTP was successfully send" })
            return;
        }
        res.status(500).json({ Message: "Username already taken" })
    }
    catch (error) {
        console.log("An unexpected error occured while registering trainee ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }

}

export const otpVerificationHandler = async (req, res) => {
    try {
        await otpVerificationController(req.body);
        res.status(200).json({ successMessage: "OTP was successfully verified" })
    }
    catch (error) {
        console.log("An unexpected error occured while verifying otp ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }

}

export const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).json("All input is required");
            return;
        }
        const success = await loginController(req.body);
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

export const getTraineeListHandler=async(req,res)=>{
    try{
        const response=await getTraineeListController()
        if(response){
            res.status(200).json(response)
            return
        }
        return 0;
    }
    catch(e){
        console.log("An unexpected error occured while listing ", e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}