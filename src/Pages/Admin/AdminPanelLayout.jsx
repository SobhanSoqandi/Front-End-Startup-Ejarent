import React, { useState } from 'react'
import AppLayout from '../../UI/AppLayout';
import Sidebar from '../../UI/Sidebar';
import { BiSolidDashboard } from 'react-icons/bi';
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoNotifications } from 'react-icons/io5';
import { HiCalendar } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { FaGripLinesVertical } from 'react-icons/fa6';
import { CustomNavLink } from '../../UI/Panel/CustomNavlink';
import Logout from '../../components/Auth/Logout';

function AdminPanelLayout() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const SidebarLink = [
        { label: "داشبورد", icon: <BiSolidDashboard className="w-5 h-5 " />, path: "complete" },
        { label: "پیام ها", icon: <TbMessageReportFilled className="w-5 h-5" />, path: "complete-profile", notif: "12" },
        { label: " تنظیمات ", icon: <IoNotifications className="w-5 h-5" />, path: "Notifocation" },
        { label: " مدریت آگهی ها ", icon: <HiCalendar className="w-5 h-5" />, path: "callender" },
    ];


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

                                <CustomNavLink
                                    to={item.path}
                                    notif={item.notif}
                                    icon={item.icon}
                                    isCollapsed={isCollapsed}
                                    label={item.label}
                                >
                                </CustomNavLink>

                            )
                        }

                        <div className="bottom-0" >
                            <Logout />
                        </div>

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