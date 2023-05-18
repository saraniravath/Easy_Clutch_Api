import mysql2 from 'mysql2';
const pool = mysql2.createPool({
    connectionLimit: 4,
    host: "localhost",
    database: "vehicle",
    user: "root",
    password: "Welcome@1",
});

export default pool.promise();
