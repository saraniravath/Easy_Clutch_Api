import { pool } from "../util/mysql.js"


export const getTraineeByUsername = async (username) => {

    const [rows, fields] = await pool.query("SELECT * FROM trainee WHERE username= ?",
        [username]);
    if (rows) {
        return rows[0];
    }
    return;
}

export const updateTraineeDetails = async (traineeDetails, id) => {
    const { firstName, lastName, password } = traineeDetails;

    const basicQuery = "UPDATE trainee SET ";
    let fields = [];
    let values = [];
    if (traineeDetails.firstName) {
        fields.push("first_name = ?")
        values.push(firstName)
    }
    if (traineeDetails.lastName) {
        fields.push("last_name = ?")
        values.push(lastName)
    }
    if (traineeDetails.password) {
        fields.push("password = ?")
        values.push(password)
    }

    const whereQuery = " WHERE id = ?"
    values.push(id)

    const sqlQuery = basicQuery + fields.join(",") + whereQuery;


    const result = await pool.query(sqlQuery, values);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const addTraineeDetails = async (traineeDetails) => {
    const { firstName, lastName, username, password } = traineeDetails;
    // Create user in our database
    const [result] = await pool.query(
        "INSERT INTO trainee (username, password,first_name,last_name) VALUES (?,?,?,?)",
        [username, password, firstName, lastName]
    );
    return result.insertId;
}


export const storeOtp = async (otpDetails) => {

    const { userId, otp } = otpDetails;

    await pool.query(
        "INSERT INTO trainee_otp (trainee_id, otp_key, expiry) VALUES (?,?,DATE_ADD(NOW(), INTERVAL 5 MINUTE))",
        [userId, otp]
    );
    return true;

}


export const getUserId = async (username) => {
    const [rows, fields] = await pool.query("SELECT id FROM trainee WHERE username= ?",
        [username]);
    return rows[0].id
}

export const checkIfOtpIsValid = async (otp, userId) => {
    const [rows, fields] = await pool.query("SELECT COUNT(1) AS VALID FROM trainee_otp WHERE trainee_id= ? AND otp_key= ? AND expiry > NOW()",
        [userId, otp]);
    if (rows)
        return rows[0].VALID;
    return false;
}


export const updateActive = async (id) => {

    const result = await pool.query("UPDATE trainee SET active= 1 WHERE id = ?", [id]);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}


export const getUserByUsername = async (username) => {

    const [rows, fields] = await pool.query("SELECT * FROM trainee WHERE username= ? AND active = 1",
        [username]);
    if (rows)
        return rows[0];
    return {};
}


export const getTraineeList = async () => {
    const [rows, fields] = await pool.query("SELECT id, username, first_name firstName, last_name lastName FROM trainee WHERE active = 1");
    if (rows)
        return rows;
    return [];
}


export const getBookingList = async () => {
    const [rows, fields] = await pool.query("SELECT trainee.id traineeId,trainee.first_name firstName,trainee.last_name lastName,vehicle_type.name vehicleType FROM trainee,package,vehicle_type WHERE trainee.id=package.trainee_id AND package.package_vehicle_type_id=vehicle_type.id AND package.active=1");
    if (rows)
        return rows;
    return [];
}
