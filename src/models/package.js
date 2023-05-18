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
