const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

// middleware to handle the file upload
const multer = require("multer");
const upload = multer({});

// importing our ballots to be cured
const ballots = require("./ballots.json");

const app = express();
const router = express.Router();

// GET route to get all ballots, not used in production
router.get("/ballots", (req, res) => {
  res.json(ballots);
});

// GET route to return a single ballot for given ballot ID
router.get("/ballots/:id", (req, res) => {
  const ballotId = req.params.id;

  const ballot = ballots.find((ballot) => ballot.id === ballotId);

  res.json(ballot);
});

// POST route to set the issueResolutionFile value to the uploaded file
router.post("/ballots/:id", upload.any(), function (req, res) {
  const ballotId = req.params.id;
  const ballotIndex = ballots.findIndex((ballot) => ballot.id === ballotId);
  const ballotToUpdate = ballots[ballotIndex];
  if (req.body) {
    ballotToUpdate.issueResolutionFile = req.body;
    res.json(ballotToUpdate);
  } else {
    const error = {
      message: "file required",
    };
    res.json(error);
  }
});

// Configuration for Netlify Function
app.use(bodyParser.json());
app.use("/.netlify/functions/server", router);

module.exports = app;
module.exports.handler = serverless(app);
