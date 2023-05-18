import pool from "../mysql.js"

export const listPackagesModel = async (name) => {
    const basicQuery = "SELECT * FROM fee_package"
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

export const updatePackagesModel = async (id, name, price) => {
    const sqlQuery = "UPDATE fee_package SET name=?, price=? WHERE id=?"
    const result = await pool.query(sqlQuery, [name, price, id])
    if(result[0].affectedRows === 0) {
        return false
    }
    return true
}