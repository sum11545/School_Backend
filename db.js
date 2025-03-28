const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error", err);
  });

// const Table = `CREATE TABLE IF NOT EXISTS schools (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   address VARCHAR(255) NOT NULL,
//   latitude FLOAT NOT NULL,
//   longitude FLOAT NOT NULL
// );
// `;
// pool
//   .query(Table)
//   .then(() => {
//     console.log("Table created");
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });

module.exports = pool;
