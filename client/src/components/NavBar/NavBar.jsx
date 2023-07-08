import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className={style.navBar}>
      <div className={style.searchContainer}>
        <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div className={style.menuContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? style.active : style.menuText
          }
        >
          Landing
        </NavLink>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? style.active : style.menuText
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) =>
            isActive ? style.active : style.menuText
          }
        >
          Form
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
