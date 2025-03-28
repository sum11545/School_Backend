const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./db");
const port = 3000;

app.use(express.json()); //

app.get("/", (req, res) => {
  res.send("Hello World");
});

//
app.post("/addSchool", async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(query, [
      name,
      address,
      parseFloat(latitude),
      parseFloat(longitude),
    ]);

    console.log("Added School:", result.rows[0]);

    res.status(201).json({
      message: "School added successfully",
      school: result.rows[0],
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; //
};

app.get("/listSchools", async (req, res) => {
  let { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  try {
    const schools = await pool.query("SELECT * FROM schools");
    const sortedSchools = schools.rows
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: sortedSchools });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
