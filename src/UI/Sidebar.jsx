import React from 'react'

function Sidebar({children}) {
  return (
    <div className="flex justify-center" >
        <ul>
            {children}
        </ul>
    </div>
  )
}

export default Sidebar