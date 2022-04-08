const { addMessage } = require("../controllers/messagesControllers");

const router = require("express").Router();

router.post("/addMessage", addMessage);

module.exports = router;
