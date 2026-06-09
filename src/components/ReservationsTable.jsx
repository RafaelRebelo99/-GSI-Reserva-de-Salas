import { useState, useEffect } from 'react'

function ReservationsTable() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(() => setError('Erro ao carregar reservas.'))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

  const formatTime = (start, end) => `${start.slice(0, 5)} - ${end.slice(0, 5)}`

  const deleteReservation = async (id) => {
    try {
      setDeletingId(id);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reservations/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Erro ao eliminar reserva");

      setReservations((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">My Reservations</h2>
        <button className="text-sm text-gray-500 hover:text-red-900 transition-colors">
          View All
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#f5f0eb] px-6 py-3">
          <span className="text-sm font-semibold text-gray-700">Room Name</span>
          <span className="text-sm font-semibold text-gray-700">Date</span>
          <span className="text-sm font-semibold text-gray-700">Time Slot</span>
          <span className="text-sm font-semibold text-gray-700 text-right">Action</span>
        </div>

        {loading && (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">A carregar...</div>
        )}
        {error && (
          <div className="px-6 py-8 text-center text-red-400 text-sm">{error}</div>
        )}

        {!loading && !error && reservations.map((r, index) => (
          <div
            key={r.id}
            className={`grid grid-cols-4 px-6 py-4 items-center ${
              index < reservations.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <span className="text-sm text-gray-800">{r.rooms?.name}</span>
            <span className="text-sm text-gray-800">{formatDate(r.date)}</span>
            <span className="text-sm text-gray-800">{formatTime(r.start_time, r.end_time)}</span>
            <div className="flex justify-end">
              <button
                onClick={() => deleteReservation(r.id)}
                disabled={deletingId === r.id}
                className={`border text-sm px-4 py-1.5 rounded transition-colors ${
                  deletingId === r.id
                    ? "opacity-50 cursor-not-allowed"
                    : "border-red-900 text-red-900 hover:bg-red-50"
                }`}
              >
                {deletingId === r.id ? "Removing..." : "Cancel"}
              </button>
            </div>
          </div>
        ))}

        {!loading && !error && reservations.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            No reservations found.
          </div>
        )}
      </div>
    </div>
  )
}

export default ReservationsTable
