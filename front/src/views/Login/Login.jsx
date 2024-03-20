//* Formulario controlado => username, password
import React, { useState } from "react";
import axios from "axios";
import styles from "../Register/Register.module.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const POSTLOGIN_URL = "http://localhost:3000/users/login";

export default function Login() {
  const initialState = {
    username: "",
    password: "",
  };

  //* States
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  //* Validar
  const validateUser = ({ username, password }) => {
    const errors = {};
    if (!username) errors.username = "Ingrese su usuario";
    if (!password) errors.password = "Ingrese su contraseña";
    return errors;
  };

  //* Handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors(validateUser({ ...user, [name]: value }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(POSTLOGIN_URL, user)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setUserData(data));
        //* Enviar al reducer una action = { type: setUserData, payload: data}
        alert("Login exitoso...");
        navigate("/home");
      })
      .catch((error) =>
        alert(`Acceso denegado: ${error?.response?.data?.message}`)
      );
  };

  //* Datos Formulario de Login
  const formData = [
    { label: "Username: ", name: "username", type: "text" },
    { label: "Password: ", name: "password", type: "password" },
  ];

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {formData.map(({ label, name, type }) => {
          return (
            <div key={name} className={styles.form}>
              <input
                type={type}
                id={name}
                name={name}
                value={user[name]}
                placeholder={`Ingresar ${label.toLowerCase()}`}
                onChange={handleChange}
              />
              {errors[name] && <span>{errors[name]}</span>}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={Object.keys(user).some((element) => !user[element])}
        >
          Ingresar
        </button>
        <div className={styles.registerLink}>
          <p>
            Don't have an account?
            <Link to="/register">
              <a> Register</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
