import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./AppointmentForm.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";

export default function AppointmentForm(props) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.actualUser?.userData?.user?.id);

  useEffect(() => {
    !userId && navigate("/");
  }, [userId, navigate]);

  const initialState = {
    date: "",
    hours: "08",
    minutes: "00",
    description: "",
  };
  //* STATES
  const [appointment, setAppointments] = useState(initialState);
  const [errors, setErrors] = useState({ date: "Debe ingresar una fecha" });

  const validateAppointment = ({ date, time, description }) => {
    const errors = {};
    if (!date) errors.date = "Debe ingresar Fecha";
    if (!time) errors.time = "Debe ingresar Hora";
    if (!description) errors.description = "Debe ingresar Descripción";
    return errors;
  };

  //* HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    const newAppointment = {
      date: appointment.date,
      time: `${appointment.hours}:${appointment.minutes}`,
      description: appointment.description,
      userId: userId,
    };

    axios
      .post(POSTAPPOINTMENT_URL, newAppointment)
      .then(({ data }) => data)
      .then((appointmentInDB) => {
        alert(`Ha sido creada la reserva: 
        Fecha: ${appointmentInDB.date}, Hora: ${appointmentInDB.time}`);
        setAppointments(initialState);
        navigate("/appointments");
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setAppointments({
      ...appointment,
      [name]: value,
    });
    setErrors(
      validateAppointment({
        ...appointment,
        [name]: value,
      })
    );
  };
  const validTime = [
    "08",
    "09",
    "10",
    "11",
    "12",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
  ];
  const validMinutes = ["00", "30"];

  function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  function getTwoMonthsAhead() {
    const today = new Date();
    const twoMonthsAhead = new Date(today);
    twoMonthsAhead.setMonth(twoMonthsAhead.getMonth() + 2);
    return twoMonthsAhead.toISOString().split("T")[0];
  }
  return (
    <div className={styles.container}>
      <h2>Reserva</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            id="date"
            name="date"
            min={getTomorrow()}
            max={getTwoMonthsAhead()}
            value={appointment.date}
            onChange={handleChange}
          />
          <div className={styles.errors}>
            {errors.date && <span>{errors.date}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="time">Horario: </label>
          <select
            name="hours"
            id="hours"
            value={appointment.hours}
            onChange={handleChange}
          >
            {validTime.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            name="minutes"
            id="minutes"
            value={appointment.minutes}
            onChange={handleChange}
          >
            {validMinutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            id="description"
            name="description"
            value={appointment.description}
            placeholder="Ingresar Descripción"
            onChange={handleChange}
          />
          <div className={styles.errors}>
            {errors.description && <span>{errors.description}</span>}
          </div>
        </div>
        <button
          type="submit"
          disabled={Object.keys(appointment).some(
            (element) => !appointment[element]
          )}
        >
          Crear Reserva
        </button>
      </form>
    </div>
  );
}
