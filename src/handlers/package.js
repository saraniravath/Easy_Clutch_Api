import {
    addScheduleController, displayRequestPackageController, getScheduleController, insertPackageController, listPackagesController,
    updatePackagesController, verifyPackagePaymentController
} from "../controllers/package.js"

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

export const updatePackagesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const price = req.body.price;
        const updated = await updatePackagesController(id, price)
        if (!updated) {
            res.status(404).json({ errorMessage: "A package with this id does not exist" })
            return
        }
        res.status(200).json({ successMessage: "The package was successfully updated" })
    }
    catch (error) {
        console.log("An unexpected error occured while updating packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}


export const notifypaymentHandler = async (req, res) => {
    try {
        const id = req.user.userId;
        if (req.user.userType === "trainee") {
            const insert = await insertPackageController(id, req.body)
            if (insert) {
                res.status(200).json({ successMessage: "The package was successfully inserted" })
                return true;
            }
        }

    }
    catch (error) {
        console.log("An unexpected error occured while notifying packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}

export const listPaymentNotificationsHandler = async (req, res) => {
    try {
        const response = await displayRequestPackageController()
        if (response) {
            res.status(200).json(response)
            return response
        }
        res.status(404).json({ errorMessage: "Package not found for inserting or displaying package" })
        return false
    }
    catch (error) {
        console.log("An unexpected error occured while notifying packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}


export const verifyPackagePaymentHandler = async (req, res) => {
    try {
        const packageId = req.params.packageId;
        const verify = await verifyPackagePaymentController(packageId)
        if (verify) {
            res.status(200).json({ successMessage: "The package was successfully activated" })
            return;
        }
        res.status(404).json({ errorMessage: "A package with this id does not exist" })
        return false;
    }
    catch (error) {
        console.log("An unexpected error occured while verifying payment: ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}


export const addScheduleHandler = async (req, res) => {
    try {
        const id = req.params.packageId;
        const code = await addScheduleController(id, req.body)
        if (code === 3) {
            res.status(200).json({ successMessage: "The schedule was successfully added" })
            return;
        }
        if (code === 0 || code === 1)
            res.status(404).json({ errorMessage: "A package with this id does not exist" })
        if (code === 2)
            res.status(400).json({ errorMessage: "Vehicle unavailiable" })
        return false;
    }
    catch (error) {
        console.log("An unexpected error occured while adding schedule: ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}

export const getScheduleHandler = async (req, res) => {
    try {
        const response = await getScheduleController(req.user)
        res.status(200).json(response)
    }
    catch (error) {
        console.log("An unexpected error occured while displaying schedule: ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}
