function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between">
      <span className="text-base font-bold text-red-900 md:flex-1">RoomSync</span>

      <span className="text-sm text-gray-500 text-center">
        © 2026 RoomSync - Instituto Piaget
      </span>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:flex-1 md:justify-end">
        <a href="#" className="text-gray-700 font-medium hover:text-red-900 transition-colors">Privacy Policy</a>
        <a href="#" className="text-gray-700 font-medium hover:text-red-900 transition-colors">Terms of Service</a>
        <a href="#" className="text-gray-700 font-medium hover:text-red-900 transition-colors">Help Desk</a>
      </div>
    </footer>
  )
}

export default Footer
