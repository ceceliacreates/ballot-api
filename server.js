const express = require("express");

const app = express();
const PORT = process.env.PORT || 8085;

const cors = require("cors");

app.use(express.json());

// Simple use of CORS that enables ALL requests. Yikes!
app.use(cors());

const ballots = require("./ballots.json");

app.get("/api/ballots", function(req, res) {
  console.log("SENT ALL BALLOTS");
  res.json(ballots);
});

app.get("/api/ballots/:id", function(req, res) {
  const ballotId = req.params.id;

  const ballot = ballots.find((ballot) => ballot.id === ballotId);

  console.log("SENT BALLOT");

  res.json(ballot);
});

app.put("/api/ballots/:id", function(req, res) {
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

app.listen(PORT, function() {
  console.log("Sever is listening at http://localhost:" + PORT);
});
