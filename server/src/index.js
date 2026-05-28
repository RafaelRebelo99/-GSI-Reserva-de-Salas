const express = require('express');
const cors = require('cors');
const roomsRoutes = require("./routes/rooms.routes.js");
const reservationsRoutes = require("./routes/reservations.routes.js");  

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use("/api/rooms", roomsRoutes);
app.use("/api/reservations", reservationsRoutes);  

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});