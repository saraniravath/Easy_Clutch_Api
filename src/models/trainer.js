import pool from "../util/mysql.js"

export const getTrainerByUsername = async (username) => {

    const [rows, fields] = await pool.query("SELECT * FROM trainer WHERE username= ?",
        [username]);
    if (rows)
        return rows[0];
    return {};
}