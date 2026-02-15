import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { TbEyeSearch, TbSearch } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';

function SearchInput() {


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


  return (



    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full mx-auto space-x-2 px-2 ">
      <div className="relative w-full mx-1">
        <div className="absolute inset-y-0 start-0 text-3xl flex items-center ps-3  ">
          <a className="font-[lalezar] font-bold text-orange-500 text-xl md:hidden">اجارنت</a>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="جستجو در آگهی‌ها"
          className="block w-full md:w-[270px] lg:w-[400px] h-[50px] bg-gray-100 rounded-xl
              placeholder:text-sm
              py-2 pe-10 ps-16 md:ps-5
              focus:outline-none focus:ring-1 focus:ring-blue-400"
        />


        <button type="button" className="absolute m-0.5 bg-white rounded-xl inset-y-0 end-0 flex items-center px-1 text-blue-500 ">
          <span className="text-sm px-1 " > نیشابور </span>
          <FaLocationDot />
        </button>
      </div>

    </form>
  )
}

export default SearchInput