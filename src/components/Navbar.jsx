import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-red-900' : 'text-gray-500 hover:text-red-900'
  }`

const navLinkDesktopClass = ({ isActive }) =>
  `text-sm font-medium pb-3 border-b-2 transition-colors ${
    isActive
      ? 'text-red-900 border-red-900'
      : 'text-gray-500 border-transparent hover:text-red-900'
  }`

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-red-900">RoomSync</span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={navLinkDesktopClass}>Dashboard</NavLink>
          <NavLink to="/rooms" className={navLinkDesktopClass}>Rooms</NavLink>
        </div>

        {/* User + hamburger */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-gray-700">Prof. Tiago Mota</span>
          <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          {/* Hamburger button */}
          <button
            className="md:hidden p-1 text-gray-500 hover:text-red-900 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pt-4 pb-2 border-t border-gray-100 mt-3">
          <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/rooms" className={navLinkClass} onClick={() => setMenuOpen(false)}>Rooms</NavLink>
          <span className="text-sm text-gray-700 sm:hidden">Prof. Tiago Mota</span>
        </div>
      )}
    </nav>
  )
}

export default Navbar
