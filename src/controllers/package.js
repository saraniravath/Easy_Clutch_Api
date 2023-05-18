import { listPackagesModel } from "../models/package.js"

export const listPackagesController = (name) => {
    return listPackagesModel(name)
}