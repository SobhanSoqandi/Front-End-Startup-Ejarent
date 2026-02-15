import React, { useState } from 'react'
import Modal from '../../UI/Modal';
import FilterNavbar from './FilterNavbar';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

function Navbar() {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between mt-2" >
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex bg-blue-500 items-center text-white shadow rounded-xl mr-3 px-3 gap-x-2 cursor-pointer" >
                <HiOutlineSwitchHorizontal />
                فیلتر
            </button>
            <div className="flex w-full overflow-x-scroll mx-2 items-center border-r border-r-gray-300" >
                <span className="tag--style" > اجاره ی روزانه </span>
                <span className="tag--style" >  گران ترین  </span>
                <span className="tag--style" >  لوازم خانگی  </span>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="فیلتر آگهی ها"
            >
               <FilterNavbar 
               setOpen={() =>setOpen(false)}
               />
            </Modal>
        </div>
    )
}

export default Navbar