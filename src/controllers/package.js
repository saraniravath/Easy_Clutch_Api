import { listPackagesModel, updatePackagesModel } from "../models/package.js"

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}

export const updatePackagesController = (id,price) => {
    return updatePackagesModel(id,price)
}
