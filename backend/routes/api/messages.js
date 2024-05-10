const express = require("express");
const Message = require("../../models/message");

const router = new express.Router();

router.post("/messages", async (req, res) => {
  try {
    const { userID, receiverID, ...messageData } = req.body;
    const message = new Message({
      ...messageData,
      sender: userID,
      receiver: receiverID,
    });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/messages", async (req, res) => {
  try {
    const userID = req.body.userID;
    const receiverID = req.body.receiverID;
    const messages = await Message.find({
      $or: [
        { sender: userID, receiver: receiverID },
        { sender: receiverID, receiver: userID },
      ],
    });
    res.send(messages);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
