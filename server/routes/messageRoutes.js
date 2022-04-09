const { addMessage, allMessages } = require("../controllers/messagesControllers");

const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/allMessages", allMessages);

module.exports = router;
