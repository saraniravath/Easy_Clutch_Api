import mysql2 from 'mysql2'
import express from 'express'
import { listPackagesHandler, updatePackagesHandler, verifyPackagePaymentHandler } from './handlers/package.js';
import { loginHandler, otpVerificationHandler, traineeRegisterHandler } from './handlers/trainee.js';
import cors from 'cors';
import { traineeAuth, trainerAuth } from './middleware/auth.js';
import { trainerLoginHandler } from './handlers/trainer.js';
// import dotenv from 'dotenv';
// dotenv.config();

/*const connection = mysql2.createConnection({
    host: "localhost",
    database: "easy_clutch",
    user: "root",
    password: "Data@base",
})

const connection = mysql2.createConnection({
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,  
});*/

const app = express();
app.use(express.json())
const port = 5000;

app.use(cors());

app.listen(port, () => {
    console.log("port no:5000");
    /*connection.connect((err) =>{
        if(err) throw err;
        console.log("Connected to port:5000");
    })*/
})

app.get("/packages", listPackagesHandler)

app.put("/packages/:id", updatePackagesHandler)

app.post("/feepackages", (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;

        connection.query('INSERT INTO fee_package(name,price) values(?,?)', [name, price], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });

    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})
app.delete('/feepackages/:id', (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.query.id);
        connection.query('DELETE FROM fee_package WHERE id=?', [id], (err, result) => {

            if (err) throw err;
            res.status(200).json(result);

        })
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})
app.get("/vehicles", (req, res) => {
    try {
        const basicQuery = "SELECT * FROM vehicles WHERE active=1"
        const values = []
        const fields = [basicQuery]
        if (req.query.category) {
            fields.push('category=?')
            values.push(req.query.category)
        }
        if (req.query.modelName) {
            fields.push('modelName=?')
            values.push(req.query.modelName)
        }
        if (req.query.registrationNumber) {
            fields.push('registrationNumber=?')
            values.push(req.query.registrationNumber)
        }
        const sqlQuery = fields.join(' AND ')
        connection.query(sqlQuery, values, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})
//update
app.put("/vehicles/:id", (req, res) => {
    try {
        console.log(req.body);
        const id = req.params.id;
        const modelName = req.body.modelName;
        const registrationNumber = req.body.registrationNumber;
        const category = req.body.category;

        connection.query('UPDATE vehicles SET modelName=?, registrationNumber=?, category=? WHERE id =? AND active = 1', [modelName, registrationNumber, category, id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})
//create
app.post("/vehicles", (req, res) => {
    try {
        const modelName = req.body.modelName;
        const registrationNumber = req.body.registrationNumber;
        const category = req.body.category;

        connection.query('INSERT INTO vehicles(modelName,registrationNumber,category) values(?,?,?)', [modelName, registrationNumber, category], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})
//delete
app.delete('/vehicles/:id', (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.query.id);
        connection.query('UPDATE vehicles SET active=0 WHERE id=?', [id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);

        });
    }
    catch (e) {
        console.log(e.message)
        res.status(500).json({ errorMessage: 'An unexpected error occured. Check server logs' });
    }
})


app.post('/packages/:packageId/verify', trainerAuth, verifyPackagePaymentHandler)
app.post('/trainees/register', traineeRegisterHandler)
app.post('/trainees/register/verify', otpVerificationHandler)
app.post(`/trainees/login`, loginHandler)
app.post('/trainer/login', trainerLoginHandler)
