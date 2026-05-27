const { getReservationsByRoomAndDate, createReservation } = require("../services/reservations.service.js");

async function postReservation(req, res) {
  const { room_id, professor_name, date, start_time, end_time } = req.body;

  // Busca reservas existentes para a mesma sala e dia
  const { data: existing, error: fetchError } = await getReservationsByRoomAndDate(room_id, date);

  if (fetchError) return res.status(500).json({ error: "Erro ao verificar disponibilidade." });

  // Verifica conflito de horário
  const conflict = existing.some(r =>
    start_time < r.end_time && end_time > r.start_time
  );

  if (conflict) {
    return res.status(409).json({ error: "A sala já está reservada nesse horário." });
  }

  const { data, error } = await createReservation({ room_id, professor_name, date, start_time, end_time });

  if (error) return res.status(500).json({ error: "Erro ao criar reserva." });

  res.status(201).json(data);
}

module.exports = { postReservation };