import { pool } from "../util/mysql.js"

export const listPackagesModel = async (name) => {
    const basicQuery = "SELECT id, name, price, price_id priceId FROM vehicle_type"
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
    if (rows.length > 0) {
        return rows;
    }
    return [];
}

export const getAvailableSession = async () => {
    const [rows, fields] = await pool.query("SELECT session_per_package sessionPerPackage FROM trainer");
    return rows[0].sessionPerPackage;
}

export const insertPackageModel = async (id, packageDetails, available) => {
    const result = await pool.query("INSERT INTO package(trainee_id,transaction_id,package_vehicle_type_id,remaining_sessions) values(?,?,?,?)",
        [id, packageDetails.transactionId, packageDetails.vehicleType, available]);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getActivePackageIdForVehicle = async (vehicleId, traineeId) => {
    const [rows, fields] = await pool.query("SELECT package.id FROM package, vehicle, vehicle_type WHERE vehicle.id = ? AND vehicle_type.id = vehicle.type AND package.package_vehicle_type_id = vehicle.type AND package.remaining_sessions > 0 AND package.trainee_id = ?", [vehicleId, traineeId]);
    if (rows[0]) {
        return rows[0].id
    }
    return 0
}

export const checkVehicleActive = async (id) => {
    const [rows, fields] = await pool.query("SELECT * FROM vehicle WHERE id=? AND active=1", [id]);
    if (rows.length > 0) {
        return true
    }
    return false
}

export const checkVehicleUsage = async (scheduleDetails) => {
    const [rows, fields] = await pool.query("SELECT * FROM booked_session WHERE vehicle_id=? AND date = ? AND FN_or_AN = ?",
        [scheduleDetails.vehicleId, scheduleDetails.date, scheduleDetails.time]);
    if (rows.length > 0) {
        return false
    }
    return true
}

export const addScheduleModel = async (id, scheduleDetails) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query("INSERT INTO booked_session(package_id, date, FN_or_AN, vehicle_id) values(?,?,?,?)",
            [id, scheduleDetails.date, scheduleDetails.time, scheduleDetails.vehicleId]);
        await connection.query("UPDATE package SET remaining_sessions=remaining_sessions-1 WHERE id=?", [id]);
        await connection.commit()
        connection.release()
    } catch (error) {
        await connection.rollback()
        connection.release()
        throw error
    }
}

export const getScheduleForTrainerModel = async () => {
    const [rows, fields] = await pool.query("SELECT DATE_FORMAT(bs.date, '%Y-%m-%d') date, bs.FN_or_AN session, trainee.first_name firstName,trainee.last_name lastName, vehicle.model_name modelName, vehicle.registration_number registrationNumber FROM booked_session bs,package,trainee,vehicle WHERE bs.package_id=package.id AND package.trainee_id=trainee.id AND bs.vehicle_id=vehicle.id;");
    if (rows.length > 0) {
        return rows
    }
    return []
}

export const getScheduleForTraineeModel = async (traineeId) => {
    const [rows, fields] = await pool.query("SELECT DISTINCT DATE_FORMAT(bs.date, '%Y-%m-%d') AS date, bs.FN_or_AN AS session, vehicle.model_name AS modelName FROM booked_session bs JOIN package ON bs.package_id = package.id JOIN trainee ON package.trainee_id = trainee.id JOIN vehicle ON bs.vehicle_id = vehicle.id WHERE package.trainee_id = ?", [traineeId]);
    if (rows.length > 0) {
        return rows
    }
    return []
}

export const checkVehicleAllowedInPackage = async (vehicleId, packageId) => {
    const [rows, fields] = await pool.query("SELECT COUNT(1) vehicleAllowed FROM vehicle, package, vehicle_type WHERE vehicle.id = ? AND vehicle.type = vehicle_type.id AND vehicle_type.id = package.package_vehicle_type_id AND package.id = ?", [vehicleId, packageId])
    return rows[0].vehicleAllowed
}

export const getPriceIdOfProduct = async (productId) => {
    const [rows, fields] = await pool.query("SELECT price_id priceId FROM vehicle_type WHERE id = ?", [productId])
    return rows[0].priceId
}

export const registerPackagePayment = async (transactionId, traineeEmail, productPriceId) => {
    await pool.query("INSERT INTO package(trainee_id, transaction_id, package_vehicle_type_id) VALUES ( (SELECT id FROM trainee WHERE username = ?), ?, (SELECT id FROM vehicle_type WHERE price_id = ?))", [traineeEmail, transactionId, productPriceId]);
    return
}