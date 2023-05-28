import pool from "../mysql.js"

export const listVehiclesModel = async (type, model_name, registration_number) => {
    const basicQuery = "SELECT * FROM vehicle WHERE active=1"
    const values = []
    const fields = []
    if (type) {
        fields.push('type=?')
        values.push(type)
    }
    if (model_name) {
        fields.push('model_name=?')
        values.push(model_name)
    }
    if (registration_number) {
        fields.push('registration_number=?')
        values.push(registration_number)
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

export const updateVehiclesModel = async (id, model_name, registration_number, type) => {
    const sqlQuery = "UPDATE vehicle SET model_name=?, registration_number=?, type=? WHERE id =? AND active = 1"
    const result = await pool.query(sqlQuery, [model_name, registration_number, type, id])
    if (result[0].affectedRows === 0) {
        return false
    }
    return true
}

export const insertVehiclesModel = async (id, model_name, registration_number, type) => {
    const sqlQuery = "INSERT INTO vehicle(model_name,registration_number,type) values(?,?,?)"
    const result = await pool.query(sqlQuery, [model_name, registration_number, type])
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