"use strict";
const client = require("../config/db");
const format = require('pg-format');
const helper = require('../helpers/numbers')

exports.createProducts = async (products) => {
  products = products.map((item) => {
    item = Object.values(item)
    item.push(helper.timeSCL())
    item.push(helper.timeSCL())
    return item
  })

  let sql =
    `INSERT INTO products(origin, src, name, price, brand, key, collected_at, calendar_dt) VALUES %L 
    ON CONFLICT (calendar_dt, key)
    DO UPDATE SET
	  price = EXCLUDED.price,
	  collected_at = EXCLUDED.collected_at
    RETURNING *`;
  try {
    let res = await client.query(format(sql, products))
    console.log(res.rows.length + ' rows analized')
    return true
  } catch (err) {
    console.log(err.stack)
    return false
  }
};