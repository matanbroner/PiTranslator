// Main server file
// Run with node index.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const WSS = require("./websocketServer");

// Set up YAML to env variables
require("env-yaml").config();

// Init WS
WSS.init();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Health Check
app.get("/", (req, res) => {
  res.send("OK");
});

app.use((req, res, next) => {
  res.finish = (statusCode, data, err) => {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.statusCode = statusCode;
    res.send(data);
  }
  next();
})


app.use("/api", require("./api"));

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
