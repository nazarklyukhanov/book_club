const raitingRouter = require("express").Router();
const RaitingController = require("../controllers/Raiting.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

raitingRouter.post("/:id", RaitingController.getRaiting);


module.exports = raitingRouter

