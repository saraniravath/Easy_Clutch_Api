import { listPackagesModel, updatePackagesModel } from "../models/package.js"

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}

export const updatePackagesController = (id,name,price) => {
    return updatePackagesModel(id,name,price)
}