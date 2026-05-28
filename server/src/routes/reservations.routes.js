const express = require("express");
const { getReservations, postReservation } = require("../controllers/reservations.controller.js");

const router = express.Router();

router.get("/", getReservations);
router.post("/", postReservation);

module.exports = router;