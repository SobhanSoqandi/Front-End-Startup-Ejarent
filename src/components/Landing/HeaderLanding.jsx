import { TbCalendarTime, TbEyeSearch, TbSearch, TbUser } from "react-icons/tb";
import { FaFolderPlus, FaRegUser } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa6";



function HeaderLanding() {

  const HeaderLink = [
    {
      label: " آگهی ها ",
      path: "/complete-profile"
    },
  ]

  return (

    <>
      <div className="w-[80px] lg:mr-10" >
        <img src="images\mark\logo-minimise.png" alt="" />
      </div>


      <div className="" >

        <form className="flex items-center max-w-lg mx-auto space-x-2">
          <label for="voice-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute text-blue-500 inset-y-0 start-0 text-3xl flex items-center ps-3  ">
              <TbEyeSearch />
            </div>
            <input
              className="block w-[270px] lg:w-[400px] h-[50px] bg-gray-100 rounded-xl
         placeholder:text-sm
         py-2 pe-10 ps-12
         focus:outline-none focus:ring-1 focus:ring-gray-50"
              placeholder=" جستجو در اجارنت "
            />


            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 text-2xl">
              <TbSearch />
            </button>
          </div>

        </form>

      </div>



      <div className="py-3 px-10" >
        <ul className="flex gap-x-5 items-center " >
          {
            HeaderLink.map((item) => (
              <li >
                {item.label}
                {item.icon}
              </li>
            ))
          }

          <li className="flex items-center gap-x-1 text-blue-600 border-2 border-blue-500 p-2 rounded-xl" >
            <FaRegCalendarPlus className="text-xl" />
            افزودن آگهی
          </li>

          <li className="flex  items-center bg-blue-500 text-white p-2 rounded-lg" >

            <FaRegUser />
            حساب کاربری

          </li>
        </ul>
      </div>

    </>

  )
}

export default HeaderLanding;