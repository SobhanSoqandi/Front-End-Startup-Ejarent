import React, { useState } from 'react'
import AppLayout from '../../UI/AppLayout';
import Sidebar from '../../UI/Sidebar';
import { BiSolidDashboard } from 'react-icons/bi';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoNotifications } from 'react-icons/io5';
import { HiCalendar } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { FaGripLinesVertical } from 'react-icons/fa6';

function AdminPanelLayout() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const SidebarLink = [
        { label: "داشبورد", icon: <BiSolidDashboard className="w-5 h-5 " />, path: "complete" },
        { label: "پیام ها", icon: <TbMessageReportFilled className="w-5 h-5" />, path: "complete-profile", notif: "12" },
        { label: " تنظیمات ", icon: <IoNotifications className="w-5 h-5" />, path: "Notifocation" },
        { label: " مدریت آگهی ها ", icon: <HiCalendar className="w-5 h-5" />, path: "callender" },
    ];

    const ActiveClass = "text-blue-500 border-r-2 rounded-md text-sm";

    const NavlinkClass = "flex my-3 text-gray-500 text-sm hover:text-blue-500 hover:border-r-2 rounded-md p-1";

    const NotifClass = "absolute top-0 right-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white bg-red-500";

    return (
        <div>
            <AppLayout
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            >


                <div
                    className={`
                     fixed right-0 z-40 h-screen bg-white shadow m-2 rounded-2xl
                     transition-all duration-300 ease-in-out
                     ${isOpen ? "translate-x-0" : "translate-x-full"}
                     ${isCollapsed ? "w-14" : "w-40"}
                     ${!isOpen && "invisible"}
                     `}
                   >


                    <Sidebar>
                        {
                            SidebarLink.map((item) =>
                                <li
                                    key={item.path} >
                                    <NavLink

                                        className={({ isActive }) =>
                                            isActive
                                                ? `${ActiveClass} flex items-center p-1`
                                                : `${NavlinkClass}`
                                        }

                                        to={item.path}
                                    >

                                        <div className="relative m-0">
                                            <i >
                                                {item.icon}
                                            </i>
                                            {item.notif && (
                                                <span className={`${NotifClass}`}></span>
                                            )}
                                        </div>



                                        <span
                                            className={`
                                            whitespace-nowrap overflow-hidden mx-1
                                            transition-all duration-300
                                            ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                                              `}
                                        >
                                            {item.label}
                                        </span>




                                    </NavLink>


                                </li>
                            )
                        }
                    </Sidebar>
                    <button
                        onClick={() => setIsCollapsed(prev => !prev)}
                        className="bg-blue-100 w-3 h-16
                         rounded-r-lg
                         my-auto
                         absolute left-0 top-1/2 
                         flex items-center justify-center" >
                        <FaGripLinesVertical className="text-blue-500" />
                    </button>

                </div>

            </AppLayout >
        </div >
    )
}

export default AdminPanelLayout;