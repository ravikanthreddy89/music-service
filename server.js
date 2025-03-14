require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
db();

// cors & json middleware
app.use(cors());
app.use(express.json());

// auth routes
app.use('/api/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


