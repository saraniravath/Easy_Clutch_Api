import pool from "../util/mysql.js"

export const getTrainerByUsername = async (username) => {

    const [rows, fields] = await pool.query("SELECT * FROM trainer WHERE username= ?",
        [username]);
    if (rows)
        return rows[0];
    return {};
}

export const listLeaveModel = async (id, date, FN_or_AN) => {
    const basicQuery = "SELECT * FROM `leave`;"
    const values = []
    const fields = []
    if (id) {
        fields.push('id=?')
        values.push(id)
    }
    if (date) {
        fields.push('date=?')
        values.push(date)
    }
    if (FN_or_AN) {
        fields.push('FN_or_AN=?')
        values.push(FN_or_AN)
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

export const updateLeaveModel = async (id, date, FN_or_AN) => {
    const sqlQuery = "UPDATE `leave` SET date = ?, FN_or_AN = ? WHERE id = ?"
    const result = await pool.query(sqlQuery, [date, FN_or_AN, id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const insertLeaveModel = async (date, FN_or_AN) => {
    const sqlQuery = "INSERT INTO `leave` (date, FN_or_AN) VALUES (?, ?)"
    const result = await pool.query(sqlQuery, [date, FN_or_AN])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const deleteLeaveModel = async (id, date, FN_or_AN) => {
    const sqlQuery = "DELETE from `leave` WHERE id =?"
    const result = await pool.query(sqlQuery, [id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}