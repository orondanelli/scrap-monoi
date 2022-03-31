'use strict';

const client = require('../config/db');

exports.createProducts = async (products) => {
    let sql = 'INSERT INTO products(origin, src, name, price, brand) VALUES($1, $2, $3, $4, $5) RETURNING *'

    try {
        const res = await client.query(sql, products)
        console.log(res.rows[0])
        return true
      } catch (err) {
        console.log(err.stack)
        return false
      }
}