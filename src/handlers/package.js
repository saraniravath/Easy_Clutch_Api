import { listPackagesController, updatePackagesController, verifyPackagePaymentController } from "../controllers/package.js"

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
