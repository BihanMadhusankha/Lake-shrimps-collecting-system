const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 const bcrypt = require('bcryptjs'); // For password hashing
const db = require('../config/dbconfig');

const ap = express();

ap.use(cors());
ap.use(bodyParser.json());

// Define SQL query string for inserting new collector data
const INSERT_COLLECTOR_SQL = `
  INSERT INTO  collectersignup (firstname, lastname, nicCollecter, emailCollecter, ferry, lake, hashedPassword, mobileNo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

// Function to handle collector creation route (corrected as a function)
async function createCollector(req, res) {
  const { firstname, lastname, nicCollecter, emailCollecter, ferry, lake, hashedPassword, mobileNo } = req.body;
  console.log('Recieved collector : ',{ firstname, lastname, nicCollecter, emailCollecter, ferry, lake, hashedPassword, mobileNo })

  try {
    // Hash password using bcrypt (install bcryptjs first: npm install bcryptjs)
     const hashedPassword = await bcrypt.hash(hashedPassword, 10); // Adjust salt rounds as needed

    // Execute SQL query with prepared statement to prevent SQL injection
    const [result] = await db.execute(INSERT_COLLECTOR_SQL, [
      firstname,
      lastname,
      nicCollecter,
      emailCollecter,
      ferry,
      lake,
      hashedPassword,
      mobileNo,
    ]);

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Collector created successfully' });
    } else {
      res.status(500).json({ message: 'Error creating collector' }); // Handle unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating collector' }); // Handle database or server errors
  }
}

// Register the route handler for POST requests to '/api/collectors'
ap.post('/', async (req, res) => {
  console.log('Recieved POST request for /signup');
  createCollector(req, res);
});

module.exports = ap; 