const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const pool = require('./config/dbconfig'); // Assuming this is your database connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define SQL query string for inserting new collector data
const INSERT_COLLECTOR_SQL = `
  INSERT INTO collectersignup (firstname, lastname, nicCollecter, emailCollecter, ferry, lake, password, mobileNo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

// Function to handle collector creation route (corrected as a function)
async function createCollector(req, res) {
  const { firstname, lastname, nicCollecter, emailCollecter, ferry, lake, conformPassword, mobileNo } = req.body;

  try {
    // Hash password using bcrypt (install bcryptjs first: npm install bcryptjs)
    const hashedPassword = await bcrypt.hash(conformPassword, 10); // Adjust salt rounds as needed

    // Execute SQL query with prepared statement to prevent SQL injection
    const [result] = await pool.execute(INSERT_COLLECTOR_SQL, [
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
app.post('/api/collectors', createCollector);

// ... other routes for your application ...

// Start the server (assuming you have a port defined)
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app; // Export the app instance for testing (optional)
