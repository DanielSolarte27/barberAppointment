import axios from "axios";
import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
const emailRegExp = /\S+@\S+\.\S+/;

const POSTUSER_URL = "http://localhost:3000/users/register";

export default function Register(props) {
  const initialForm = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  //* STATES
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({ name: "Debe ingresar nombre" });

  const validateForm = ({
    name,
    email,
    birthdate,
    nDni,
    username,
    password,
    confirmPassword,
  }) => {
    const errors = {};
    if (!name) errors.name = "Debe ingresar Nombre";
    if (!email) errors.email = "Debe ingresar Email";
    else {
      if (!emailRegExp.test(email)) errors.email = "Email inválido";
    }
    if (!birthdate) errors.birthdate = "Debe ingresar Fecha de Nacimiento";
    if (!nDni) errors.nDni = "Debe ingresar Número de Identificaión";
    if (!username) errors.username = "Debe ingresar Usuario";
    if (!password) errors.password = "Debe ingresar Contraseña";
    if (password !== confirmPassword)
      errors.confirmPassword = "Los password deben ser iguales";

    return errors;
  };

  //* HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: form.name,
      email: form.email,
      birthdate: form.birthdate,
      nDni: form.nDni,
      username: form.username,
      password: form.password,
    };
    axios
      .post(POSTUSER_URL, newUser)
      .then(({ data }) => data)
      .then((userDB) => {
        alert(`El Usuario ${userDB.name} ha sido creado exitosamente`);
        setForm(initialForm);
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors(
      validateForm({
        ...form,
        [name]: value,
      })
    );
  };

  const handleReset = (event) => {
    event.preventDefault();
    setForm(initialForm);
  };

  //* DATOS DEL FORMULARIO
  const formData = [
    {
      label: "Nombre: ",
      name: "name",
      type: "text",
      placeholder: "Ingrese su Nombre",
    },
    {
      label: "Email: ",
      name: "email",
      type: "email",
      placeholder: "Ingrese su Email",
    },
    {
      label: "Fecha Nacimiento: ",
      name: "birthdate",
      type: "date",
      placeholder: "Ingrese su Fecha de Nacimiento",
    },
    {
      label: "N° DNI: ",
      name: "nDni",
      type: "text",
      placeholder: "Ingrese su Número de Identificación",
    },
    {
      label: "Username: ",
      name: "username",
      type: "text",
      placeholder: "Ingrese su Usuario",
    },
    {
      label: "Contraseña: ",
      name: "password",
      type: "password",
      placeholder: "Ingrese su Contraseña",
    },
    {
      label: "Confirmar Contraseña: ",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmar Contraseña",
    },
  ];
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {formData.map(({ label, name, type, placeholder }) => {
          return (
            <div key={name} className={styles.form}>
              <input
                type={type}
                id={name}
                name={name}
                value={form[name]}
                placeholder={placeholder}
                onChange={handleChange}
              />
              {errors[name] ? <span>{errors[name]}</span> : null}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={Object.keys(form).some((element) => !form[element])}
        >
          Enviar
        </button>
        <button onClick={handleReset}>Borrar</button>
        <div className={styles.registerLink}>
          <p>
            Already have an account?
            <Link to="/login">
              <a> Login</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
