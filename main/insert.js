const con = require("./db")

// Create table if not exists
con.query(`
  CREATE TABLE IF NOT EXISTS test5 (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
  );
`).then(() => console.log('Table is ready'))
  .catch(err => console.error('Table creation error:', err));

  

  //route to insert new log into the table

  const insertUser = async (name, email) => {
    const query = 'INSERT INTO test5 (name, email) VALUES ($1, $2) RETURNING *';
    try {
      const res = await con.query(query, [name, email]);
      console.log('User added:', res.rows[0]);
    } catch (error) {
      console.error('Error inserting user', error);
    }
  };
  
  insertUser('test4', 'test4@example.com');
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