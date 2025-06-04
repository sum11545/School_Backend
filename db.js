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
    return createTableAndIndex();
  })
  .catch((err) => {
    console.log("Error", err);
  });

// // const Table = `CREATE TABLE IF NOT EXISTS schools (
// //   id SERIAL PRIMARY KEY,
// //   name VARCHAR(255) NOT NULL,
// //   address VARCHAR(255) NOT NULL,
// //   latitude FLOAT NOT NULL,
// //   longitude FLOAT NOT NULL
// // );
// // `;
// // pool
// //   .query(Table)
// //   .then(() => {
// //     console.log("Table created");
// //   })
// //   .catch((err) => {
// //     console.log("Error", err);
// //   });

// const indexQuery = `
//       DO $$
//       BEGIN
//         IF NOT EXISTS (
//           SELECT 1 FROM pg_indexes
//           WHERE indexname = 'unique_school_entry'
//         ) THEN
//           CREATE UNIQUE INDEX unique_school_entry
//           ON schools (LOWER(name), LOWER(address), latitude, longitude);
//         END IF;
//       END $$;
//     `;
// await pool.query(indexQuery);
// console.log("Unique index ensured");

async function createTableAndIndex() {
  try {
    // 1. Create table if not exists
    const tableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      );
    `;
    await pool.query(tableQuery);
    console.log("Table ensured");

    // 2. Create unique index to prevent exact duplicates
    const indexQuery = `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE indexname = 'unique_school_entry'
        ) THEN
          CREATE UNIQUE INDEX unique_school_entry 
          ON schools (LOWER(name), LOWER(address), latitude, longitude);
        END IF;
      END $$;
    `;
    await pool.query(indexQuery);
    console.log("Unique index ensured");
  } catch (err) {
    console.error("Setup error:", err.message);
  }
}

module.exports = pool;
