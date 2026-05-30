const express = require("express");
const { getReservations, postReservation, deletedReservation } = require("../controllers/reservations.controller.js");

const router = express.Router();

router.get("/", getReservations);
router.post("/", postReservation);
router.delete("/:id", deletedReservation);

module.exports = router;