const { Client } =require('pg')
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const fs = require('fs')


dotenv.config()

// app.use(express.json())

const port = process.env.DB_PORT;

const con = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    url: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.DB_SSL).toString(),
    }
});

con.connect().then(()=> console.log(`connected to psql on PORT ${port}`))
 module.exports = con;
