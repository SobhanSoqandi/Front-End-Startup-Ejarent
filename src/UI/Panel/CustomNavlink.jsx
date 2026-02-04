import { NavLink } from "react-router-dom";

export function CustomNavLink({ children, to, icon, notif , label , isCollapsed }) {

    const navlinkClass = "flex my-3 text-gray-500 text-sm hover:text-blue-500 hover:border-r-2 rounded-md p-1";

    const ActiveClass = "text-blue-500 border-r-2 rounded-md text-sm bg-blue-50";

    const NotifClass = "absolute top-0 right-0 block h-1.5 w-1.5 rounded-full ring-1 ring-white bg-red-500";


    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive
                        ? `${ActiveClass} flex items-center p-1`
                        : `${navlinkClass}`
                }
            >

                <div className="relative m-0">
                    <i >
                        {icon}
                    </i>
                    {notif && (
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
                    {label}
                </span>

            </NavLink>
        </li>
    );
}
