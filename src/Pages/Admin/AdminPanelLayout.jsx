import React, { useState } from 'react'
import AppLayout from '../../UI/AppLayout';
import Sidebar from '../../UI/Sidebar';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { RiDashboard3Fill } from "react-icons/ri";
import { TbMessageReportFilled } from 'react-icons/tb';
import { IoNotifications } from 'react-icons/io5';
import { HiCalendar } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { FaGripLinesVertical } from 'react-icons/fa6';
import { CustomNavLink } from '../../UI/Panel/CustomNavlink';
import Logout from '../../components/Auth/Logout';
import { IoIosSwitch } from "react-icons/io";
import useUser from '../../features/User/useUser';
import { FaUsers } from 'react-icons/fa';

function AdminPanelLayout() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const { user } = useUser(); 

    const [isOpen, setIsOpen] = useState(true);

    const isAdmin = user?.role === 2;

    const SidebarLink = isAdmin
        ? [
            { label: "داشبورد", icon: <RiDashboard3Fill className="w-6 h-6" />, path: "/dashboard" },
            { label: "مدیریت کاربران", icon: <FaUsers className="w-6 h-6" />, path: "admin/users" },
            {
                label: " دسته بندی های سیستم ", icon: <BiSolidCategoryAlt
                    className="w-6 h-6" />, path: "admin/categories"
            },
            { label: " ویژگی ها ", icon: <IoIosSwitch className="w-6 h-6" />, path: "admin/attributes" },

        ]
        : [
            { label: "داشبورد", icon: <RiDashboard3Fill className="w-6 h-6" />, path: "" },
            { label: " آگهی های من ", icon: <TbMessageReportFilled className="w-6 h-6" />, path: "myadv", notif: "12" },
            { label: " دسته بندی ها ", icon: <IoNotifications className="w-6 h-6" />, path: "categories" },
            { label: " مدریت آگهی ها ", icon: <HiCalendar className="w-6 h-6" />, path: "callender" },
        ];

    return (
        <div>
            <AppLayout
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            >
                <div
                    className={`
                     fixed right-0 z-40 h-screen bg-white shadow-lg border border-gray-50 m-2 rounded-2xl
                     transition-all duration-300 ease-in-out
                     ${isOpen ? "translate-x-0" : "translate-x-full"}
                     ${isCollapsed ? "w-14" : "w-52"}
                     ${!isOpen && "invisible"}
                     `}
                >

                    <Sidebar
                        isCollapsed={isCollapsed}
                    >



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