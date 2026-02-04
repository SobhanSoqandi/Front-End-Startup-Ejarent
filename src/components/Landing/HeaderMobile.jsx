import { FaLocationDot } from "react-icons/fa6";
import { TbEyeSearch, TbSearch } from "react-icons/tb";
import Navbar from "./Navbar";


function HeaderMobile() {
  return (

    <div className="w-full py-2" >

      <form className="flex items-center w-full mx-auto space-x-2 px-2 ">
        <div className="relative w-full mx-1">
          <div className="absolute text-blue-500 inset-y-0 start-0 text-3xl flex items-center ps-3  ">
             <a className="font-[lalezar] font-bold text-orange-500 text-xl">اجارنت</a>
          </div>
          <input
            className="block w-full h-[50px] bg-gray-100 rounded-xl
               text-black
               placeholder:text-gray-400
               py-2 pe-10 ps-16
               focus:outline-none focus:shadow focus:shadow-blue-400"
            placeholder=" جستجو در اجارنت "
          />


          <button type="button" className="absolute m-0.5 bg-white rounded-xl inset-y-0 end-0 flex items-center px-1 text-blue-500 ">
            <span className="text-sm px-1 " > نیشابور </span>
            <FaLocationDot />
          </button>
        </div>

      </form>



      <div className="border-t border-gray-200 mt-2" >
        <Navbar />
      </div>

    </div>





  )
}

export default HeaderMobile;