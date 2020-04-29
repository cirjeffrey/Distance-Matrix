// api
// AIzaSyC01O8pfFE9GOTPy-2QADgRAQjZdPU3eFg distance
// AIzaSyC01O8pfFE9GOTPy-2QADgRAQjZdPU3eFg places
//AIzaSyBDBogpc-GSdpfdovoS9QCoqKg69OVFjgE maps
const express = require("express");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test.html");

  // res.send("Hello world");
});

app.post("/travel", (req, res) => {
  var start = req.body.;
  res.send(start);

  /*
    var respString = "Start: " + start
    */
});

app.listen(PORT, () => {
  console.log("Hello world!");
});
