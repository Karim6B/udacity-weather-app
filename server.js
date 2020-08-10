// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, () => {
  console.log("welcome to my server");
});

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/addData", (req, res) => {
  let data = req.body;
  newEntry = {
    temperature: data.temperature,
    date: data.date,
    userResponse: data.userResponse,
  };
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
});
