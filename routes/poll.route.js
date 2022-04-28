const express = require("express");
const {
  createPoll,
  markPoll,
  viewPoll,
  allPolls,
} = require("../controllers/poll.controller");
const router = express.Router();

router.post("/create", createPoll);
router.get("/poll/:id", viewPoll);
router.put("/mark", markPoll);
router.get("/all", allPolls);

module.exports = router;
