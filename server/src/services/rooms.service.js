const { supabase } = require("../supabase/supabaseClient.js");

async function getAllRooms() {
  return await supabase.from("rooms").select("*");
}

module.exports = { getAllRooms };
