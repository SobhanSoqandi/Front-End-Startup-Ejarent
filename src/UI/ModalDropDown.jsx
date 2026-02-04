import React, { Children } from 'react'
import { createPortal } from 'react-dom';

function ModalDropDown({ children, open }) {
    return (

        open &&
            <div className="bg-white absolute mt-10 rounded-xl p-2 shadow" >
                {children}
            </div>
    )
}

export default ModalDropDown;