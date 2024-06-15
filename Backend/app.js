const express = require('express');
const errorHandler = require('./midleware/errorhandler.js');
const connectDB = require('./config/dbconfig.js');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

connectDB();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({ origin: '*' })); 

app.use('/SSABS/', require('./routes/signup.js'));
app.use('/SSABS/admin/', require('./routes/admin.js'));
app.use('/forgetpassword/', require('./routes/forgetpassword.js'));
app.use('/profile', require('./routes/profile.js'));
app.use('/allInstructer', require('./routes/instructer.js'));
app.use('/SSABS/vehicaleOwn', require('./routes/vehicleOwner.js'));
app.use('/instructor', require('./routes/instructer.js'));


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
