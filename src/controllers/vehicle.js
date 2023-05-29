import { deleteVehiclesModel, insertVehiclesModel, listVehiclesModel, updateVehiclesModel } from "../models/vehicle.js"


export const listVehiclesController = (type, modelName, registrationNumber) => {
    return listVehiclesModel(type, modelName, registrationNumber)
}

export const updateVehiclesController = (id, modelName, registrationNumber, type) => {
    return updateVehiclesModel(id, modelName, registrationNumber, type)
}

export const insertVehiclesController = (modelName, registrationNumber, type) => {
    return insertVehiclesModel(modelName, registrationNumber, type)
}

export const deleteVehicleController = (id) =>  {
    return deleteVehiclesModel(id)
}