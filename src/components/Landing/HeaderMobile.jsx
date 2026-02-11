import { FaLocationDot } from "react-icons/fa6";
import { TbEyeSearch, TbSearch } from "react-icons/tb";
import Navbar from "./Navbar";
import SearchInput from "./SearchInput";


function HeaderMobile() {
  return (

    <div className="w-full py-2" >

     <SearchInput />



      <div className="border-t border-gray-200 mt-2" >
        <Navbar />
      </div>

    </div>





  )
}

export default HeaderMobile;