require('dotenv').config();

let postgres = require('postgres')
console.log(process.env.HOST)
console.log(process.env.PORT)
console.log(process.env.DATABASE)
console.log(process.env.USER)
console.log(process.env.PASSWORD)

const sql = postgres('postgres://username:password@host:port/database', {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
})

module.exports = sql