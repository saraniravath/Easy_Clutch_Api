import { pool } from "../util/mysql.js"

export const getTrainerByUsername = async (username) => {

    const [rows, fields] = await pool.query("SELECT * FROM trainer WHERE username= ?",
        [username]);
    if (rows)
        return rows[0];
    return {};
}

export const listLeaveModel = async (date, fnOrAn) => {
    const basicQuery = "SELECT id, DATE_FORMAT(date, '%Y-%m-%d') day, FN_or_AN fnOrAn FROM `leave`"
    const values = []
    const fields = []
    if (date) {
        fields.push('date=?')
        values.push(date)
    }
    if (fnOrAn) {
        fields.push('FN_or_AN=?')
        values.push(fnOrAn)
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


export const updateLeaveModel = async (id, date, fnOrAn) => {
    const sqlQuery = "UPDATE `leave` SET date = DATE(?), FN_or_AN = ? WHERE id = ?"
    const result = await pool.query(sqlQuery, [date, fnOrAn, id])
    if (result[0].affectedRows === 0) {
        return -1
    }
    return 1
}

export const insertLeaveModel = async (date, fnOrAn) => {
    const sqlQuery = "INSERT INTO `leave` (date, FN_or_AN) VALUES (DATE(?), ?)"
    await pool.query(sqlQuery, [date, fnOrAn])
    return 1
}

export const deleteLeaveModel = async (id) => {
    const sqlQuery = "DELETE from `leave` WHERE id =?"
    const result = await pool.query(sqlQuery, [id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}


export const insertTrainer = async (trainerDetails) => {
    const sqlQuery = "INSERT INTO Trainer (username,password,firstname,lastname) VALUES (?, ?, ?, ?)"
    await pool.query(sqlQuery, [trainerDetails.username, trainerDetails.password, trainerDetails.firstName, trainerDetails.lastName])
    return 1
}