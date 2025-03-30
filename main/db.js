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





// Create table if not exists
//  con.query(`
//   CREATE TABLE IF NOT EXISTS test5 (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(150) NOT NULL
//   );
// `).then(() => console.log('Table is ready'))
//   .catch(err => console.error('Table creation error:', err));

  

  //route to insert new log into the table

  // const insertUser = async (name, email) => {
  //   const query = 'INSERT INTO test5 (name, email) VALUES ($1, $2) RETURNING *';
  //   try {
  //     const res = await con.query(query, [name, email]);
  //     console.log('User added:', res.rows[0]);
  //   } catch (error) {
  //     console.error('Error inserting user', error);
  //   }
  // };
  
  // insertUser('hal', 'hal@example.com');
  // insertUser('Chu', 'Chu@example.com');

//   app.post('/DB_URL', async (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) return res.status(400).send('Name and email are required.');
    
//     try {
//       await insertUser(name, email); // Call insert function
//       res.status(201).send('User added');
//     } catch (error) {
//       res.status(500).send('Error inserting user');
//     }
//   });

  // app.post('/insert', async (req, res) => {
  //   const { name, email } = req.body;
  //   if (!name || !email) return res.status(400).send('name and email is required.');
  
  //   try {
  //     const result = await con.query(
  //       'INSERT INTO fitbel (name, email) VALUES ($1, $2)  RETURNING *', 
  //       [name, email]
  //     );
  //     res.status(201).json(result.rows[0]);
  //   } catch (error) {
  //     result.status(500).send('Error inserting table.');
  //   }
  // });


//   app.listen(port, () => {
    // console.log(`app is listening on PORT ${port}`);
// });

 module.exports = con;