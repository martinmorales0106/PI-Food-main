import React, { useEffect, useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../Redux/actions";

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(searchRecipe(search));
    }, 500); 
    return () => clearTimeout(searchTimeout);
  }, [search, dispatch]);

  return (
    <div className={style.container}>
      <input
        onChange={handleChange}
        className={style.input}
        value={search}
        type="search"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
