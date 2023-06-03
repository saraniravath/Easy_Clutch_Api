import {
    activatePackage, addScheduleModel, checkVehicleActive, checkVehicleUsage, getAvailiableSession, getRemainingSession, getRequestpackage,
    getScheduleForTraineeModel,
    getScheduleForTrainerModel,
    getTraineeIdOfPackage, insertPackageModel, listPackagesModel, updatePackagesModel
} from "../models/package.js"

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}

export const updatePackagesController = (id, price) => {
    return updatePackagesModel(id, price)
}

export const insertPackageController = async (id, packageDetails) => {
    const availiable = await getAvailiableSession()
    if (availiable > 0) {
        console.log(packageDetails, availiable)
        await insertPackageModel(id, packageDetails, availiable)
        return true;
    }
    return false;
}

export const displayRequestPackageController = async () => {
    return await getRequestpackage()
}

export const verifyPackagePaymentController = async (id) => {
    const traineeId = await getTraineeIdOfPackage(id)
    if (traineeId) {
        await activatePackage(id)
        return true;
    }
    return false;
}


export const addScheduleController = async (id, scheduleDetails) => {
    const packageDetails = await getRemainingSession(id)
    const checkVehicle = await checkVehicleActive(scheduleDetails.vehicleNameId)
    const checkUsage = await checkVehicleUsage(scheduleDetails)
    if (packageDetails > 0 && checkVehicle && checkUsage) {
        const response = await addScheduleModel(id, scheduleDetails)
        if (response) {
            return true
        }
    }
    return 0
}

export const getScheduleController = (user) => {
    if (user.userType === 'trainee') {
        return getScheduleForTraineeModel()
    } else {
        return getScheduleForTrainerModel()
    }
}
