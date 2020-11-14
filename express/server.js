const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
//const cors = require("cors");
const ballots = require("./ballots.json");

const app = express();

const router = express.Router();

router.get("/ballots", (req, res) => {
  res.json(ballots);
});

router.get("/ballots/:id", (req, res) => {
  const ballotId = req.params.id;

  const ballot = ballots.find((ballot) => ballot.id === ballotId);

  res.json(ballot);
});

router.post("/ballots/:id", function (req, res) {
  const ballotId = req.params.id;

  const ballotIndex = ballots.findIndex((ballot) => ballot.id === ballotId);

  const ballotToUpdate = ballots[ballotIndex];

  if (ballotToUpdate.pin === req.body.pin) {
    ballotToUpdate.issueResolutionFile = req.body.issueResolutionFile;

    ballotToUpdate.issueResolutionMessage = req.body.issueResolutionMessage;

    res.json(ballotToUpdate);
  } else {
    const error = {
      message: "invalid pin",
    };
    res.json(error);
  }
});

//app.use(cors());
app.use(bodyParser.json());
app.use("/.netlify/functions/server", router);

module.exports = app;
module.exports.handler = serverless(app);
