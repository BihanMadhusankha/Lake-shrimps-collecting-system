const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRouter = require('./routes/customer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/Customer', customerRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
