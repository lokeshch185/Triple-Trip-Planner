// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
require('./models/dbConnection');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // ink PNGs can be large

// Routes
const tripRoutes = require('./routes/tripRoutes');
const mapRoutes = require('./routes/mapRoutes');
app.use('/api/trips', tripRoutes);
app.use('/api/maps', mapRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(5000, () => console.log("Server running on :5000"));
