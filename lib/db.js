const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "reactboyz",
  database: "muni_data",
  port: "5432",
});

async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { query };