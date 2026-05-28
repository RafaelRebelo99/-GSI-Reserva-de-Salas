const { supabase } = require("../supabase/supabaseClient.js");

async function getAllReservations() {
  return await supabase
    .from("reservations")
    .select("*, rooms(name)")
    .order("date", { ascending: true });
}

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

module.exports = { getAllReservations, getReservationsByRoomAndDate, createReservation };