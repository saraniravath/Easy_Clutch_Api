import pool from "../util/mysql.js"

export const listPackagesModel = async (name) => {
    const basicQuery = "SELECT * FROM vehicle_type"
    const values = []
    const fields = []
    if (name) {
        fields.push("name=?")
        values.push(name)
    }
    const whereQuery = fields.join(" AND ")
    let sqlQuery
    if (whereQuery !== "") {
        sqlQuery = basicQuery + " WHERE " + whereQuery
    } else {
        sqlQuery = basicQuery
    }
    const [rows] = await pool.query(sqlQuery, values)
    return rows
}

export const updatePackagesModel = async (id, price) => {
    const sqlQuery = "UPDATE vehicle_type SET price=? WHERE id=?"
    const result = await pool.query(sqlQuery, [price, id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}


export const activatePackage = async (id) => {
    const result = await pool.query("UPDATE package SET active= 1 WHERE id = ?", [id]);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getRequestPackage = async () => {
    const [rows, fields] = await pool.query("SELECT package.id,trainee.first_name firstName,trainee.last_name lastName,vehicle_type.name vehicleType,package.transaction_id transactionId,package.trainee_id traineeId FROM package,trainee,vehicle_type WHERE package.active=0 AND trainee.id=package.trainee_id AND package.package_vehicle_type_id=vehicle_type.id");
    if (rows) {
        return rows;
    }
    return 0;
}

export const getAvailableSession = async () => {
    const [rows, fields] = await pool.query("SELECT session_per_package FROM trainer");
    if (rows) {
        return rows[0].session_per_package;
    }
    return 0;
}

export const insertPackageModel = async (id, packageDetails, availiable) => {
    const result = await pool.query("INSERT INTO package(trainee_id,transaction_id,package_vehicle_type_id,remaining_sessions) values(?,?,?,?)",
        [id, packageDetails.transactionId, packageDetails.vehicleType, availiable]);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getRemainingSession = async (id) => {
    const [rows, fields] = await pool.query("SELECT remaining_sessions FROM package WHERE id=? AND active=1", [id]);
    if (rows[0]) {
        return rows[0].remaining_sessions
    }
    return 0
}

export const checkVehicleActive = async (id) => {
    const [rows, fields] = await pool.query("SELECT * FROM vehicle WHERE id=? AND active=1", [id]);
    if (rows[0]) {
        return true
    }
    return 0
}

export const checkVehicleUsage = async (scheduleDetails) => {
    const [rows, fields] = await pool.query("SELECT * FROM booked_session WHERE vehicle_id=? AND date = ? AND FN_or_AN = ?",
        [scheduleDetails.vehicleNameId, scheduleDetails.date, scheduleDetails.time]);
    if (rows[0]) {
        return 0
    }
    return true
}

export const addScheduleModel = async (id, scheduleDetails) => {
    const insert = await pool.query("INSERT INTO booked_session(package_id, date, FN_or_AN, vehicle_id) values(?,?,?,?)",
        [id, scheduleDetails.date, scheduleDetails.time, scheduleDetails.vehicleNameId]);
    await pool.query("UPDATE package SET remaining_sessions=remaining_sessions-1 WHERE id=?", [id]);
    if (insert[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getScheduleForTrainerModel = async () => {
    const [rows, fields] = await pool.query("SELECT bs.date, bs.FN_or_AN session, trainee.first_name firstName,trainee.last_name lastName, vehicle.model_name modelName, vehicle.registration_number registrationNumber FROM booked_session bs,package,trainee,vehicle WHERE bs.package_id=package.id AND package.trainee_id=trainee.id AND bs.vehicle_id=vehicle.id;");
    if (rows[0]) {
        return rows
    }
    return {}
}

export const getScheduleForTraineeModel = async () => {
    const [rows, fields] = await pool.query("SELECT bs.date, bs.FN_or_AN session, trainee.id traineeId, vehicle.model_name modelName FROM booked_session bs,package,trainee,vehicle WHERE bs.package_id=package.id AND package.trainee_id=trainee.id AND bs.vehicle_id=vehicle.id");
    if (rows[0]) {
        return rows
    }
    return {}
}