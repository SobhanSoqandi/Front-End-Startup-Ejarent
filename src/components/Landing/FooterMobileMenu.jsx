import React from 'react'
import { FaBookmark, FaRegCalendarPlus, FaUser } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import CustomeNavlinkFooter from '../../UI/Landing/CustomeNavlinkFooter';

const FooterItem = [
  {
    label: "خانه",
    icon: <FaHouse />,
    link: "/"
  },
  {
    label: " افزودن آگهی   ",
    icon: <FaRegCalendarPlus />,
    link: "/complete-profile"
  }, {
    label: " پسندها ",
    icon: <FaBookmark />,
    link: "/likes"
  }, {
    label: " حساب کاربری ",
    icon: <FaUser />,
    link: "/panel"
  },
]

function FooterMobileMenu() {
  return (
    <div className="bg-white z-50 outline-none shadow-2xl shadow-blue-800 p-2" >
      <ul className="flex justify-around text-gray-500" >

        {
          FooterItem.map((item) => (
            <CustomeNavlinkFooter
              icon={item.icon}
              label={item.label}
              to={item.link}
            />
          ))
        }





      </ul>
    </div>
  )
}

export default FooterMobileMenu;