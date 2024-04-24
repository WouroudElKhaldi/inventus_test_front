import React, { useContext } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/userContext";
export function Navbar(props) {
  const { user, LogOut } = useContext(AuthContext);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav__ul}>
        <li className={styles.nav__li}>
          <Link to={"/"} className={styles.nav__link}>
            Home
          </Link>
        </li>
        {user && user.role === "Admin" ? (
          <li className={styles.nav__li}>
            <Link to={"/dash/tables"} className={styles.nav__link}>
              Dashboard
            </Link>
          </li>
        ) : (
          ""
        )}
        {user ? (
          <li className={styles.nav__li}>
            <span
              onClick={() => LogOut()}
              className={`${styles.nav__link} ${styles.logout}`}
            >
              Logout
            </span>
          </li>
        ) : (
          <>
            <li className={styles.nav__li}>
              <Link to={"/login"} className={styles.nav__link}>
                Login
              </Link>
            </li>
            <li className={styles.nav__li}>
              <Link to={"/signup"} className={styles.nav__link}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
