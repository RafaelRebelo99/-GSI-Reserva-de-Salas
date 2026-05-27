import { useState } from 'react'

function ReservationModal({ sala, onClose, onConfirm }) {
  const [form, setForm] = useState({
    professorName: '',
    date: '',
    startTime: '',
    endTime: '',
  })

  const [errors, setErrors] = useState({})

  // ── Helpers ────────────────────────────────────────────────────────────────

  function today() {
    return new Date().toISOString().split('T')[0]
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate() {
    const next = {}

    if (!form.professorName.trim())
      next.professorName = 'Professor name is required.'

    if (!form.date)
      next.date = 'Date is required.'

    if (!form.startTime)
      next.startTime = 'Start time is required.'

    if (!form.endTime) {
      next.endTime = 'End time is required.'
    } else if (form.startTime && form.endTime <= form.startTime) {
      next.endTime = 'End time must be after start time.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleConfirm() {
    if (!validate()) return
    onConfirm?.({ roomName: sala.name, ...form })
    onClose()
  }

  // ── Input class helper ─────────────────────────────────────────────────────

  function inputClass(hasError) {
    return [
      'w-full border rounded px-3 py-2 text-sm text-gray-800',
      'focus:outline-none focus:ring-2 focus:ring-red-900/30 transition-colors',
      hasError
        ? 'border-red-400 bg-red-50'
        : 'border-gray-300 bg-white hover:border-gray-400',
    ].join(' ')
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-gray-200 rounded-lg w-full max-w-md mx-4 flex flex-col gap-0 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-red-900">New Reservation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">

          {/* Room — read-only */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">Room</label>
            <div className="flex items-start justify-between gap-2 border border-gray-200 rounded px-3 py-2 bg-gray-50">
              <div>
                <p className="text-sm font-bold text-red-900">{sala.name}</p>
                <p className="text-xs text-gray-500">{sala.floor} • {sala.wing}</p>
              </div>
              <span className="text-xs font-semibold border border-gray-300 rounded px-2 py-0.5 text-gray-600 whitespace-nowrap mt-0.5">
                {sala.type}
              </span>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            Capacity: {sala.capacity} Students
          </div>

          <hr className="border-gray-200" />

          {/* Professor Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">Professor Name</label>
            <input
              type="text"
              placeholder="e.g. Prof. Silva"
              value={form.professorName}
              onChange={e => handleChange('professorName', e.target.value)}
              className={inputClass(!!errors.professorName)}
            />
            {errors.professorName && (
              <p className="text-xs text-red-500">{errors.professorName}</p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">Date</label>
            <input
              type="date"
              min={today()}
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              className={inputClass(!!errors.date)}
            />
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          {/* Start / End Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-medium">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={e => handleChange('startTime', e.target.value)}
                className={inputClass(!!errors.startTime)}
              />
              {errors.startTime && (
                <p className="text-xs text-red-500">{errors.startTime}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-medium">End Time</label>
              <input
                type="time"
                value={form.endTime}
                onChange={e => handleChange('endTime', e.target.value)}
                className={inputClass(!!errors.endTime)}
              />
              {errors.endTime && (
                <p className="text-xs text-red-500">{errors.endTime}</p>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-900 text-white text-sm font-medium px-4 py-2 rounded hover:bg-red-800 transition-colors"
          >
            Confirm Reservation
          </button>
        </div>

      </div>
    </div>
  )
}

export default ReservationModal
