import {
    activatePackage, addScheduleModel, checkVehicleActive, checkVehicleUsage, getAvailableSession, getRemainingSession, getRequestPackage,
    getScheduleForTraineeModel,
    getScheduleForTrainerModel,
    insertPackageModel, listPackagesModel, updatePackagesModel
} from "../models/package.js"

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}

export const updatePackagesController = (id, price) => {
    return updatePackagesModel(id, price)
}

export const insertPackageController = async (id, packageDetails) => {
    const available = await getAvailableSession()
    if (available > 0) {
        await insertPackageModel(id, packageDetails, available)
        return true;
    }
    return false;
}

export const displayRequestPackageController = () => {
    return getRequestPackage()
}

export const verifyPackagePaymentController = async (id) => {
    return await activatePackage(id)
}


export const addScheduleController = async (id, scheduleDetails) => {
    const vehicleActive = await checkVehicleActive(scheduleDetails.vehicleNameId)
    const remainingSessions = await getRemainingSession(id)
    const vehicleBooked = await checkVehicleUsage(scheduleDetails)
    if (remainingSessions < 1)
        return 1
    else if (!vehicleActive || !vehicleBooked)
        return 2
    else {
        const response = await addScheduleModel(id, scheduleDetails)
        if (response) {
            return 3
        }
    }
    return 0;
}

export const getScheduleController = (user) => {
    if (user.userType === 'trainee') {
        return getScheduleForTraineeModel()
    } else {
        return getScheduleForTrainerModel()
    }
}
