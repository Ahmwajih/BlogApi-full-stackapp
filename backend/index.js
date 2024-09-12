const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

const dbConnection = require('./configs/dbConnection');
dbConnection();

app.use(express.json());
require('express-async-errors'); // Correctly require the package

app.use(require('./middlewares/auth'));
app.use(require('./middlewares/filterSort'));
app.use(require('./middlewares/logger'));

app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});