import {
    activatePackage, addScheduleModel, checkVehicleActive, checkVehicleUsage, getAvailableSession, getRemainingSession, getRequestPackage,
    getScheduleForTraineeModel,
    getScheduleForTrainerModel,
    insertPackageModel, listPackagesModel, updatePackagesModel, checkVehicleAllowedInPackage
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


export const addScheduleController = async (packageId, scheduleDetails) => {
    const vehicleActive = await checkVehicleActive(scheduleDetails.vehicleId)
    const remainingSessions = await getRemainingSession(packageId)
    const vehicleFree = await checkVehicleUsage(scheduleDetails)
    const vehicleAllowedInPackage = await checkVehicleAllowedInPackage(scheduleDetails.vehicleId, packageId)
    if (remainingSessions < 1)
        return 1
    else if (!vehicleActive || !vehicleFree)
        return 2
    else if(vehicleAllowedInPackage === 0)
        return 3
    else {
        await addScheduleModel(packageId, scheduleDetails)
        return 4
    }
}

export const getScheduleController = (user) => {
    if (user.userType === 'trainee') {
        return getScheduleForTraineeModel()
    } else {
        return getScheduleForTrainerModel()
    }
}
