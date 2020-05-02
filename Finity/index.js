/*
Main node.js file that holds most of the route endpoints and their functionalities
index page for initial landing page. Goal was to just display "hello world" and take in data for Post
distance page used for taking in input data and calculating distance between two points using Google's Distance Matrix API
contacts page used for running GET requests related to CSV manipulation
trips page used for reading csv data and calculating distances UNFINISHED

*/

const express = require("express");
const app = express();
const fs = require("fs");
const csv = require("csv-parser");
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

var IDS = [];
var results = [];
var loc = [];
// Index page sends "hello world" on GET request for task 1. Also starts with two forms to begin data entry for task 2
app.get("/", (req, res) => {
  console.log("HELLO WORLD");
  res.render("index.ejs");
});

app.get("/distance", (req, res) => {
  res.render("distance.ejs", { origin: 91792, destination: 91745 });
});

// Reads CSV files and parses information for task 3.
// First readstream gets IDS of any contact satisfying the condition of having an expense > 25000 and stores IDS into an array
// Second readstream checks for any matching IDS that exist within the previously made array and only pushes those
app.get("/contacts", (req, res) => {
  fs.createReadStream("fake_finity_data/trip_data.csv")
    .pipe(csv())
    .on("data", function (data) {
      if (parseInt(data.trip_expense_total.substring(1)) >= 25000) {
        IDS.push(data.contact_id);
      }
    })
    .on("end", function (data) {});

  fs.createReadStream("fake_finity_data/contacts.csv")
    .pipe(csv())
    .on("data", function (data) {
      if (IDS.includes(data.id)) {
        results.push({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      }
    })
    .on("end", function (data) {
      res.send(results);
    });
});

// Readstream takes in trip data csv and uses the origin and destination elements to calculate their distance in between using
// the same functions from the task 2
app.get("/trips", (req, res) => {
  fs.createReadStream("fake_finity_data/trip_data.csv")
    .pipe(csv())
    .on("data", function (data) {
      var origin = data.trip_origin_latitude + "," + data.trip_origin_longitude;
      var dest = data.trip_dest_latitude + "," + data.trip_dest_longitude;
      loc.push([origin, dest]);
    })
    .on("end", function (data) {
      res.render("trips.ejs", { arr: loc });
    });
});

// POST method used to display the distance between two given points. Passes in origin and destination to be calculated
app.post("/distance/", (req, res) => {
  res.render("distance.ejs", {
    origin: req.body.origin,
    destination: req.body.destination,
  });
});

app.listen(3000);
