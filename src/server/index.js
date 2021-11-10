// Main server file
// Run with node index.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");

// Set up YAML to env variables
require("env-yaml").config();

app.use(bodyParser.json());
app.use(cors());

// Health Check
app.get("/", (req, res) => {
  res.send("OK");
});

// Run the server
db.dbSetup()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
