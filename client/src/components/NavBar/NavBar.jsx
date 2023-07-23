import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";

const NavBar = ({ setCurrentPage }) => {
  const { pathname } = useLocation();
  return (
    <div className={style.navBar}>
      {pathname === "/home" ? (
        <div className={style.searchContainer}>
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>
      ) : (
        <div className={style.searchContainer}></div>
      )}
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
          Add Recipe
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
