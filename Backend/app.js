const express = require('express');
const errorHandler = require('./midleware/errorhandler');
const connectDB = require('./config/dbconfig');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Database connection (assuming asynchronous)
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: '*' })); // Consider more specific origins for production

// Mount signup route handler
app.use('/SSABS/user/', require('./routes/signup'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
