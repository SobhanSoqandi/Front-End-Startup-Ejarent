import { NavLink } from "react-router-dom";

function CustomeNavlinkFooter({ to, icon, label }) {
  return (
    <li className="flex-1">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-0.5 transition-all duration-300
          ${isActive ? "text-blue-600 scale-110" : "text-gray-400 hover:text-blue-500"}`
        }
      >
        {({ isActive }) => (
          <>
            {/* آیکون */}
            <span
              className={`text-xl p-2 rounded-xl transition-all duration-300 my-1
              ${isActive ? "bg-blue-100 text-blue-500" : ""}`}
            >
              {icon}
            </span>

            <span className="relative text-sm font-medium pb-2">
              {label}

              <span
                className={`absolute -bottom-2 left-0 rounded-full transition-all duration-300
              ${isActive ? "bg-blue-600 w-full h-2" : "bg-transparent h-0"}`}
              />
            </span>

          </>
        )}
      </NavLink>
    </li>
  );
}

export default CustomeNavlinkFooter;
