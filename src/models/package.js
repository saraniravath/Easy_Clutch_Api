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
    const result = await pool.query("UPDATE package SET active= 1 WHERE trainee_id = ?", [id]);
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const getTraineeIdOfPackage = async (id) => {
    const [rows, fields] = await pool.query("SELECT trainee_id FROM package WHERE id=?", [id]);
    if (rows) {
        return rows[0];
    }
    return 0;
}
