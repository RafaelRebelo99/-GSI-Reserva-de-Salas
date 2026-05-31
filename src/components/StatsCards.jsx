import { Building2, CheckCircle, CalendarDays, BarChart2 } from 'lucide-react'

function StatsCards({ totalRooms, freeRooms, reservedRooms }) {
  const occupancy = totalRooms ? Math.round((reservedRooms / totalRooms) * 100) : 0

  const cards = [
    {
      label: 'Total Rooms',
      value: totalRooms,
      sub: 'System Capacity',
      icon: <Building2 className="w-5 h-5 text-red-900" />,
    },
    {
      label: 'Free Rooms',
      value: freeRooms,
      sub: '● Available Now',
      icon: <CheckCircle className="w-5 h-5 text-red-900" />,
    },
    {
      label: 'Reserved Rooms',
      value: reservedRooms,
      sub: 'Active Sessions',
      icon: <CalendarDays className="w-5 h-5 text-red-900" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="border border-gray-200 rounded-lg p-5 bg-white flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">{card.label}</span>
            {card.icon}
          </div>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-400">{card.sub}</p>
        </div>
      ))}

      {/* Occupancy card */}
      <div className="border border-gray-200 rounded-lg p-5 bg-white flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Occupancy</span>
          <BarChart2 className="w-5 h-5 text-red-900" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{occupancy}%</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-red-900 h-1.5 rounded-full transition-all"
            style={{ width: `${Math.min(occupancy, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">Target &lt; 85%</p>
      </div>
    </div>
  )
}

export default StatsCards