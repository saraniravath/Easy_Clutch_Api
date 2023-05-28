import pool from "../mysql.js"

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
    const result = await pool.query(sqlQuery, [ price, id])
    if(result[0].affectedRows === 0) {
        return false
    }
    return true
}

