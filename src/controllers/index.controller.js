import { pool } from "../config/dbConnection.js";

export const ping = async(req, res) => {
    const result = await pool.query('select 1+1 as result')
    res.json(result)
}