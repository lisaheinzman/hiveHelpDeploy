const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Workshop4172',
  database: 'users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Error handling for connection pool setup
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1); // Exit the application if there's an error
  });

  app.post('/items', async (req, res) => {
    try {
      const { id, name, email, password } = req.body;
  
      const connection = await pool.getConnection();
  
      // Insert data into the database
      const [result] = await connection.query('INSERT INTO userinfo (id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, password]);
  
      connection.release();
  
      res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
    } catch (error) {
      console.error('Error inserting item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const connection = await pool.getConnection();
  
      // Query the database for the user based on the email
      const [results] = await connection.query('SELECT * FROM userinfo WHERE email = ?', [email]);
  
      connection.release();
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const user = results[0];
  
      // Perform a case-sensitive comparison of the password
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Authentication successful, return a token or session information
      // For demonstration purposes, let's assume the user ID is used as the token
      res.status(200).json({ message: 'Login successful', name: user.name });
    } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  


  app.listen(3000, '172.26.160.1', () => {
    console.log(`Server running on port 172.26.160.1:3000`);
  });

module.exports = app; // Export the Express app
