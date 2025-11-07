const raitingRouter = require("express").Router();
const RaitingController = require("../controllers/Raiting.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

raitingRouter

.get("/:id", RaitingController.getRaiting)
.post("/:id", verifyAccessToken, RaitingController.changeRaiting);


module.exports = raitingRouter

