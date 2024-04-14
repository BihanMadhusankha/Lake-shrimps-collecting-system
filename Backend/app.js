const express = require('express');
const errorHandler = require('./midleware/errorhandler');
const connectDB = require('./config/dbconfig');
const dotenv = require('dotenv').config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/customers', require("./routes/customerRouter"));
app.use('/api/users', require("./routes/signup"));

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});


