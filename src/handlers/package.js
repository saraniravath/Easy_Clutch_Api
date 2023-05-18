import { listPackagesController } from "../controllers/package.js"

export const listPackagesHandler = async (req, res) => {
    try {
        const name = req.query.name
        const response = await listPackagesController(name)
        res.status(200).json(response)
    }
    catch (error) {
        console.log("An unexpected error occured while listing packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}