📘 README: School Locator API
A simple Node.js + Express API that:

Lists nearby schools based on user’s current latitude and longitude

Validates and adds school data

Calculates distances using the Haversine formula

🚀 Features
✅ List schools sorted by nearest distance

✅ Calculate distance using coordinates (Haversine formula)

✅ Add new schools with proper input validation

✅ Filter schools within a specific radius (e.g., 10km)

)

🧪 API Endpoints
GET /listSchools
Returns all schools sorted by distance from the user's location.

Query Parameters:

latitude (required)

longitude (required)

Example:

bash
GET /listSchools?latitude=28.6139&longitude=77.2090
Response:

json
{
  "schools": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Delhi",
      "latitude": 28.6123,
      "longitude": 77.2154,
      "distance": 0.83
    }
  ]
}
POST /addSchool
Adds a new school to the database after validating the request body.

Request Body:

json
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6123,
  "longitude": 77.2154,
  "type": "public",
  "phone": "+911234567890"
}

🚀 Steps to Start the Application
1. Clone the Repository
git clone repo_link
cd repo

2. Install Dependencies
npm install

3. Set Up the PostgreSQL Database
Ensure you have PostgreSQL installed and running. Then:

Create a database (e.g., school_db)

Create a schools table:CREATE TABLE schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
4. Start the Server
node app.js

5. Test the API
localhost:3000

🙋‍♂️ Author
Sumit Rai
Built with ❤️ using Node.js, Express, PostgreSQL

