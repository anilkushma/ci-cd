const express = require("express");
const { Pool } = require("pg");
const moment = require("moment-timezone"); // Import moment-timezone
require("dotenv").config();

const app = express();
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

app.get("/api", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    
    // Convert the current time to Kathmandu time
    const kathmanduTime = moment(result.rows[0].now).tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss");

    // Return the time in Kathmandu time zone
    res.json({ time: kathmanduTime });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

