import { useState } from 'react'
import RoomCard from '../components/RoomCard'
import rooms from '../data/rooms'

function Rooms() {
  const [search, setSearch] = useState('')

  const filtered = rooms.filter(room =>
    room.nome.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="px-8 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Rooms</h1>
          <p className="text-gray-500 mt-1">Manage and reserve educational spaces for your lectures.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white w-56">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search room..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm outline-none w-full text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(room => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-12">No rooms found.</p>
      )}

    </div>
  )
}

export default Rooms
