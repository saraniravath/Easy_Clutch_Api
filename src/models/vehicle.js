import { pool } from "../util/mysql.js"

export const listVehiclesModel = async (type, modelName, registrationNumber) => {
    const basicQuery = "SELECT id, model_name modelName, registration_number registrationNumber, type FROM vehicle WHERE active=1"
    const values = []
    const fields = []
    if (type) {
        fields.push('type=?')
        values.push(type)
    }
    if (modelName) {
        fields.push('model_name=?')
        values.push(modelName)
    }
    if (registrationNumber) {
        fields.push('registration_number=?')
        values.push(registrationNumber)
    }
    const whereQuery = fields.join("AND")
    let sqlQuery
    if (whereQuery !== "") {
        sqlQuery = basicQuery + " WHERE " + whereQuery
    } else {
        sqlQuery = basicQuery
    }
    const [rows] = await pool.query(sqlQuery, values)
    return rows
}

export const updateVehiclesModel = async (id, modelName, registrationNumber, type) => {
    const sqlQuery = "UPDATE vehicle SET model_name=?, registration_number=?, type=? WHERE id =? AND active = 1"
    const result = await pool.query(sqlQuery, [modelName, registrationNumber, type, id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const insertVehiclesModel = async (modelName, registrationNumber, type) => {
    const sqlQuery = "INSERT INTO vehicle(model_name,registration_number,type) values(?,?,?)"
    const result = await pool.query(sqlQuery, [modelName, registrationNumber, type])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const deleteVehiclesModel = async (id) => {
    const sqlQuery = "UPDATE vehicle SET active=0 WHERE id=?"
    const result = await pool.query(sqlQuery, [id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getAvailableVehiclesInSession = async (sessionDetails) => {
    const [rows] = await pool.query("SELECT vehicle.id, vehicle.model_name modelName FROM vehicle WHERE vehicle.id NOT IN (SELECT vehicle_id FROM booked_session WHERE date = ? AND FN_or_AN = ?) AND vehicle.type = ? AND vehicle.active = 1", [sessionDetails.date, sessionDetails.time, sessionDetails.vehicleType])
    return rows
}

export const getAvailableVehicleTypesForUser = async (userId) => {
    const [rows] = await pool.query("SELECT vehicle_type.id, vehicle_type.name FROM vehicle_type WHERE vehicle_type.id IN ( SELECT package_vehicle_type_id FROM package WHERE active=1 AND trainee_id=? )", [userId])
    return rows
}