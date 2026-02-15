import { TbCalendarTime, TbEyeSearch, TbSearch, TbUser } from "react-icons/tb";
import { FaFolderPlus, FaRegUser } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import SearchInput from "./SearchInput";


function HeaderLanding() {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";

  function handleChange(e) {
    const value = e.target.value.trim();

    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }



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

        <SearchInput />
    
      </div>



      <div className="py-3 px-10" >
        <ul className="flex gap-x-5 items-center " >
          {
            HeaderLink.map((item) => (
              <li className=" hidden" >
                {item.label}
                {item.icon}
              </li>
            ))
          }

          <li 
           onClick={() => navigate("/add")}
          className="flex items-center gap-x-1 text-blue-600 border-2 border-blue-500 p-2 rounded-xl" >
            <FaRegCalendarPlus 
            className="text-xl" />
            افزودن آگهی
          </li>

          <li 
          onClick={() => navigate("/panel") }
          className="flex  items-center bg-blue-500 text-white p-2 rounded-lg" >
            <FaRegUser />
            حساب کاربری

          </li>
        </ul>
      </div>

    </>

  )
}

export default HeaderLanding;



