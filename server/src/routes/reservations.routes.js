const express = require("express");
const { postReservation } = require("../controllers/reservations.controller.js");

const router = express.Router();

router.post("/", postReservation);

module.exports = router;