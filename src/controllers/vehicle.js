import { deleteVehiclesModel, insertVehiclesModel, listVehiclesModel, updateVehiclesModel } from "../models/vehicle.js"


export const listVehiclesController = (type, model_name, registration_number) => {
    return listVehiclesModel(type, model_name, registration_number)
}

export const updateVehiclesController = (id, model_name, registration_number, type) => {
    return updateVehiclesModel(id, model_name, registration_number, type)
}

export const insertVehiclesController = (id, model_name, registration_number, type) => {
    return insertVehiclesModel(id, model_name, registration_number, type)
}

export const deleteVehicleController = (id) =>  {
    return deleteVehiclesModel(id)
}