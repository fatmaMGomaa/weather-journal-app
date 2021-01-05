// Setup empty JS object to act as endpoint for all routes
projectData = {temp: '', date: '', user_response: ''};
const port = 5500;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.post('/addTemp', (req, res) => {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  res.send(projectData);
});
app.get('/getData', (req, res) => res.send(projectData));

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})