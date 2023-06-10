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


export const notifyPaymentHandler = async (req, res) => {
    try {
        const id = req.user.userId;
        const sessionsAvailable = await insertPackageController(id, req.body)
        if (sessionsAvailable) {
            res.status(200).json({ successMessage: "Payment was successfully notified" })
            return true;
        }
        res.status(400).json({ successMessage: "No sessions available per package" })
    }
    catch (error) {
        console.log("An unexpected error occured while notifying packages ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}

export const listPaymentNotificationsHandler = async (req, res) => {
    try {
        const response = await displayRequestPackageController()
        res.status(200).json(response)
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
    }
    catch (error) {
        console.log("An unexpected error occured while verifying payment: ", error.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
}


export const addScheduleHandler = async (req, res) => {
    try {
        const packageId = req.params.packageId;
        const code = await addScheduleController(packageId, req.body)
        if (code === 4)
            res.status(200).json({ successMessage: "The schedule was successfully added" })
        if (code === 1)
            res.status(404).json({ errorMessage: "No remaining sessions available for this package. Buy a new package to book new sessions." })
        if (code === 2)
            res.status(400).json({ errorMessage: "This vehicle is currently not available" })
        if (code === 3)
            res.status(400).json({ errorMessage: "This vehicle does not belong to this package" })
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
