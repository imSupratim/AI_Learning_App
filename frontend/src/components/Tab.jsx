import React from 'react'

const Tab = ({ label, icon, active, onClick }) => {
  return (
    <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
      active ? "border-blue-600 text-blue-600" : "border-transparent"
    }`}
  >
    {icon}
    {label}
  </button>
  )
}

export default Tab
