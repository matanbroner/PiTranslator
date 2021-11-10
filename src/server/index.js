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

app.use("/api", require("./api"));

app.use((req, res, next) => {
  res.finish = (statusCode, data, err) => {
    res.status(statusCode).json({
      data,
      err
    });
  }
  next();
})

// Run the server
db.setupDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
