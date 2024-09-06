const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const dbConnection = require('./configs/dbConnection');
dbConnection();

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

