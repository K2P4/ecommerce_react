import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ search, setSearch,handleFilter, setFinal, setSort, sort, isShop = false }) => {
  const searchData = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setFinal(search);
      handleFilter();
    }
  };

  const handleSort = () => {
    if (sort == "desc") return setSort("asc");
    else setSort("desc");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex items-center justify-end gap-5">
      <button className=" bg-gray-50 w-[200px] md:w-auto flex items-center gap-2  text-md justify-between  px-3 py-2   rounded-lg shadow-md text-gray-500 ">
        
        <input
          type="text"
          value={search}
          onKeyDown={searchData}
          onChange={handleSearch}
          placeholder="Search..."
          className=" border-0 focus:border-0    outline-none   "
        />
        
        <SearchIcon className="hidden sm:flex text-gray-400" />
      </button>
      {
        isShop &&

        < FilterAltOutlinedIcon
          onClick={handleSort}
          sx={{ fontSize: 40 }}
          className={` cursor-pointer bg-indigo-100 w-auto shadow-md p-2 duration-700 transition-all ease-in ${sort == "desc" && "bg-indigo-200"
            } "}  rounded-full  `}
        />
      }

    </div>
  );
};

export default SearchComponent;
