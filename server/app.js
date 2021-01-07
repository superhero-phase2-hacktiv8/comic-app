require("dotenv").config();

const express = require('express');
const port = 3000;

const cors = require('cors');
const indexRouter = require('./routes')
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use(indexRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`);
})