const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("HELLO WORLD");
  res.render("index.ejs");
});

app.get("/distance", (req, res) => {
  res.render("distance.ejs", { status: "GET" });
});

app.post("/distance/", (req, res) => {
  res.render("distance.ejs", {
    origin: req.body.origin,
    destination: req.body.destination,
  });
});

app.listen(3000);
