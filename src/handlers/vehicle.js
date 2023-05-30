import { insertVehiclesController, listVehiclesController, updateVehiclesController, deleteVehicleController } from "../controllers/vehicle.js"

export const listVehiclesHandler = async (req, res) => {
    try {
        const type = req.query.category
        const modelName = req.query.modelName
        const registrationNumber = req.query.registrationNumber
        const response = await listVehiclesController(type, modelName, registrationNumber)
        res.status(200).json(response)
    }
    catch (error) {
        console.log("An unexpected error occured while listing packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' })
    }
}

export const updateVehiclesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const modelName = req.body.modelName;
        const registrationNumber = req.body.registrationNumber;
        const type = req.body.type;
        const updated = await updateVehiclesController(id, modelName, registrationNumber, type)
        if (!updated) {
            res.status(404).json({ errorMessage: "A vehicle with this id does not exist" })
            return
        }
        res.status(200).json({ successMessage: "The vehicle was successfully updated" })
    }
    catch (error) {
        console.log("An unexpected error occured while updating vehicle ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}

export const insertVehiclesHandler = async (req, res) => {
    try {
        const modelName = req.body.model_name;
        const registrationNumber = req.body.registration_number;
        const type = req.body.type;
        const inserted = await insertVehiclesController(modelName, registrationNumber, type)
        if (!inserted) {
            res.status(404).json({ errorMessage: "The vehicle was not inserted" })
            return
        }
        res.status(200).json({ successMessage: "The vehicle was successfully inserted" })
    }
    catch (error) {
        console.log("An unexpected error occured while inserting vehicle", error.message)
        res.status(500).json({ errorMessage: "An unexpected error occured. Check server logs" });
    }
}

export const deleteVehiclesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await deleteVehicleController(id)
        if (!deleted) {
            res.status(404).json({ errorMessage: "The vehicle was not deleted" })
            return
        }
        res.status(200).json({ successMessage: "The vehicle was successfully deleted" })
    }
    catch (error) {
        console.log("An unexpected error occured while deleting vehicle", error.message)
        res.status(500).json({ errorMessage: "An unexpected error occured. Check server logs" });
    }
}