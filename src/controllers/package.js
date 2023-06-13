import {
    activatePackage, addScheduleModel, checkVehicleActive, checkVehicleUsage, getAvailableSession, getRequestPackage,
    getScheduleForTraineeModel,
    getScheduleForTrainerModel,
    insertPackageModel, listPackagesModel, updatePackagesModel, getActivePackageIdForVehicle
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


export const addScheduleController = async (scheduleDetails) => {
    const vehicleActive = await checkVehicleActive(scheduleDetails.vehicleId)
    const vehicleFree = await checkVehicleUsage(scheduleDetails)
    const packageId = await getActivePackageIdForVehicle(scheduleDetails.vehicleId, scheduleDetails.traineeId)
    if (packageId === 0)
        return 1
    else if (!vehicleActive)
        return 2
    else if(!vehicleFree)
        return 3
    else {
        await addScheduleModel(packageId, scheduleDetails)
        return 4
    }
}

export const getScheduleController = (user) => {
    if (user.userType === 'trainee') {
        return getScheduleForTraineeModel(user.userId)
    } else {
        return getScheduleForTrainerModel()
    }
}
