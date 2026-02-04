import React from 'react'

function Sidebar({ children , isCollapsed }) {
  return (
    <div
      className={`flex p-3 ${isCollapsed ? "justify-center" : "justify-start"}`}
    >
      <ul>
        {children}
      </ul>
    </div>
  )
}

export default Sidebar

