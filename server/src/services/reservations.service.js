const { supabase } = require("../supabase/supabaseClient.js");

async function getReservationsByRoomAndDate(roomId, date) {
  return await supabase
    .from("reservations")
    .select("*")
    .eq("room_id", roomId)
    .eq("date", date);
}

async function createReservation(data) {
  return await supabase
    .from("reservations")
    .insert([data])
    .select()
    .single();
}

module.exports = { getReservationsByRoomAndDate, createReservation };