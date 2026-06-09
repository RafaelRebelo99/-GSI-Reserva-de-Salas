import { useState, useEffect } from 'react'
import ReservationsTable from '../components/ReservationsTable'
import StatsCards from '../components/StatsCards'

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    freeRooms: 0,
    reservedRooms: 0,
    todayReservations: 0,
  })

  useEffect(() => {
    Promise.all([
      fetch('${import.meta.env.VITE_API_URL}/api/rooms').then(r => r.json()),
      fetch('${import.meta.env.VITE_API_URL}/api/reservations').then(r => r.json()),
    ]).then(([rooms, reservations]) => {
     
      const today = new Date().toISOString().split('T')[0]

      const todayReservations = reservations.filter(r => r.date?.slice(0, 10) === today)

      const roomsReservedToday = new Set(
        todayReservations.map(r => r.room_id)
      ).size

      setStats({
        totalRooms: rooms.length,
        freeRooms: Math.max(0, rooms.length - roomsReservedToday),
        reservedRooms: roomsReservedToday,
        todayReservations: todayReservations.length,
      })
    })
  }, [])

  return (
    <div className="px-8 py-8 flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-red-900">Academic Overview</h1>
        <p className="text-gray-500 mt-1">Real-time status of Instituto Jean Piaget campus facilities.</p>
      </div>

      {/* Stats */}
      <StatsCards
        totalRooms={stats.totalRooms}
        freeRooms={stats.freeRooms}
        reservedRooms={stats.reservedRooms}
        todayReservations={stats.todayReservations}
      />

      {/* Reservations Table */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <ReservationsTable />
      </div>

    </div>
  )
}

export default Dashboard