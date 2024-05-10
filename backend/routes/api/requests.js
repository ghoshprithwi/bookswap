const express = require("express");
const Request = require("../../models/request");

const router = new express.Router();

router.post("/requests", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.send(requests);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
