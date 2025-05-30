const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

const app = express();

// MiddleWare

app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routes/auth'));

// Routes.

app.get('/' , (req , res) => {
    res.send("ShutterShare Backend Test Successful");

});

const PORT = process.env.PORT || 5000;

// Connecting to Database.
connectDB();

app.listen(PORT , '0.0.0.0' , () => {
    console.log(`Server started on Port ${PORT}`);
});