const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRouter = require('./routes/customer');
const signupRouter = require('./routes/signup');
const db = require('../config/dbconfig');
import { Jwt } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/Customer', customerRouter);

app.use('/Signup',signupRouter)



app.listen(3000, () => {
    console.log('Server started on port 3000');
});
