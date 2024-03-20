import React, { useState } from "react";
import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({
  id,
  date,
  time,
  status,
  description,
  handleAppointmentCancel,
}) {
  date = new Date(date);
  const formatDate = `
        ${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;

  const handleClick = () => {
    if (
      window.confirm(
        `¿Desea cancelar la reserva del día ${formatDate} a las ${time} hs?`
      )
    ) {
      handleAppointmentCancel(id);
    }
  };
  return (
    <div className={styles.cardContainer}>
      <span>{formatDate}</span>
      <span>{time} hs </span>
      <span>{description}</span>
      {status === "active" ? (
        <span className={styles.active} onClick={handleClick}>
          Activo (Cancelar)
        </span>
      ) : (
        <span className={styles.cancelled} onClick={handleClick}>
          Cancelado
        </span>
      )}
    </div>
  );
}
