'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mountRouters = require('./routers');
const db = require('./db');
db.ensureTables();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGINS,
}));

mountRouters(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});