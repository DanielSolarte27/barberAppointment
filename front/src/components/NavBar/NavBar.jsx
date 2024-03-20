import React from "react";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments, setUserData } from "../../redux/userSlice";

export default function NavBar() {
  //* Traer "login" del estado global
  const login = useSelector((state) => state.actualUser.userData.login);
  console.log("login: ", login);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmed = window.confirm("¿Desea Cerrar Sesión?");
    if (confirmed) {
      dispatch(setUserData({}));
      dispatch(setUserAppointments({}));
      navigate("/");
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className={styles.linksSection}>
        <NavLink to="/home">
          <span>HOME</span>
        </NavLink>
        {login && (
          <NavLink to="/appointments">
            <span>RESERVAS</span>
          </NavLink>
        )}
        {login && (
          <NavLink to="/appointmentform">
            <span>CREAR RESERVA</span>
          </NavLink>
        )}
        <NavLink to="/about">
          <span>ABOUT</span>
        </NavLink>
        <NavLink to="contact">
          <span>CONTACTO</span>
        </NavLink>
        {login ? (
          <span onClick={handleLogout}>LOGOUT</span>
        ) : (
          <NavLink to="/login">
            <span>LOGIN</span>
          </NavLink>
        )}
      </div>
      <div className={styles.avatarSection}>
        {login ? (
          <img src={avatar} alt="avatar" onClick={handleLogout} />
        ) : (
          <NavLink to="/login">
            <img src={avatar} alt="avatar" />
          </NavLink>
        )}
      </div>
    </div>
  );
}
