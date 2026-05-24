const { getAllRooms } = require("../services/rooms.service.js");

async function getRooms(req, res) {
  const { data, error } = await getAllRooms();

  if (error) return res.status(500).json(error);

  res.json(data);
}

module.exports = { getRooms };
