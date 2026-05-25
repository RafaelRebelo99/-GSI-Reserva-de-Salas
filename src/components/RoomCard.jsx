function RoomCard({ name, type, floor, wing, capacity }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-red-900">{name}</h3>
          <p className="text-sm text-gray-500">{floor} • {wing}</p>
        </div>
        <span className="text-xs font-semibold border border-gray-300 rounded px-2 py-0.5 whitespace-nowrap text-gray-600 mt-1">
          {type}
        </span>
      </div>

      {/* Capacity */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        Capacity: {capacity} Students
      </div>

      <hr className="border-gray-200" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-gray-700">Available</span>
        </div>
        <button className="bg-red-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-red-800 transition-colors">
          Reserve
        </button>
      </div>

    </div>
  )
}

export default RoomCard
