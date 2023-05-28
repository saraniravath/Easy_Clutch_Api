import mysql2 from 'mysql2';
const pool = mysql2.createPool({
    connectionLimit: 4,
    host: "localhost",
    database: "easy_clutch",
    user: "root",
    password: "Welcome@1",
});

export default pool.promise();
