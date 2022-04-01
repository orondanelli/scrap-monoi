require('dotenv').config();
const { Pool } = require('pg')
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  }
}
const pool = new Pool(config)
module.exports = pool