require('dotenv').config();

const { Pool, Client } = require('pg')
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  }
}
const pool = new Pool()
const client = new Client({
  config
})

module.exports = client