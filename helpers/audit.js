'use strict';
const client = require("../config/db");
const format = require('pg-format');

exports.initLoad = async () => {
    let sql =
    `INSERT INTO public.load_status
        (status, start_load_dt, end_load_dt)
        VALUES('Initializated', now(), null)
        RETURNING load_nbr`;
  try {
    let res = await client.query(sql)
    let loadNbr = res.rows[0].load_nbr
    console.log('load initializated with LoadNbr ' + loadNbr)
    return loadNbr
  } catch (err) {
    console.log(err.stack)
    return false
  }
}
exports.endLoad = async (loadNbr) => {
    let values = []
    values.push(loadNbr)
    let sql =
    `UPDATE public.load_status
    SET status='Ended', end_load_dt=now()
    WHERE load_nbr=$1;
    `;
  try {
    let res = await client.query(sql,values)
    console.log('load finalized with LoadNbr ' + loadNbr)
    return true
  } catch (err) {
    console.log(err.stack)
    return false
  }
}