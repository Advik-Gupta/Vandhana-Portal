import React, { useState } from "react";

function SearchBar({onHandleSearch}) {
  const [searchEng, setSearchEng] = useState("");
  const onChangeSearch = (e)=>{
    setSearchEng(e.target.value);
    onHandleSearch(e.target.value)
  }
  return (
    <div className="flex flex-wrap gap-2 px-1.5 py-2.5 text-xl bg-gray-200 rounded-3xl text-stone-400">
      
      <input
        type="text"
        value={searchEng}
        onChange={onChangeSearch}
        placeholder="Search by name OR ID"
        className="flex-auto my-auto w-[426px] max-md:max-w-full bg-transparent border-none outline-none placeholder-stone-400"
      />
    </div>
  );
}

export default SearchBar;
