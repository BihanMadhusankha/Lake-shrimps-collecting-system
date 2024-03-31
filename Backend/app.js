const express = require('express');
const cors = require('cors');
const { json } = require('body-parser') ;
const customerRouter = require('./routes/customer');
const signupRouter = require('./routes/signup');
// import { Jwt } from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(cors());

app.use('/Customer', customerRouter);

app.use('/signup', signupRouter);



const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app; 
