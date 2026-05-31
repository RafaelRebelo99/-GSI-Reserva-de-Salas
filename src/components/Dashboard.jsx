import { useState, useEffect } from 'react'
import ReservationsTable from '../components/ReservationsTable'
import StatsCards from '../components/StatsCards'

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    freeRooms: 0,
    reservedRooms: 0,
  })

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/rooms').then(r => r.json()),
      fetch('http://localhost:3001/api/reservations').then(r => r.json()),
    ]).then(([rooms, reservations]) => {
      const today = new Date().toISOString().split('T')[0]
      const activeToday = reservations.filter(r => r.date === today).length
      setStats({
        totalRooms: rooms.length,
        freeRooms: rooms.length - activeToday,
        reservedRooms: activeToday,
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
      />

      {/* Reservations Table */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        <ReservationsTable />
      </div>

    </div>
  )
}

export default Dashboard