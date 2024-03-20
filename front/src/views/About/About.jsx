import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2>About Me</h2>
      <p>
        ¡Bienvenido a nuestra aplicación de agendamiento de turnos para
        barbería! Estamos emocionados de presentarte una forma conveniente y
        eficiente de gestionar tus citas con tu barbero favorito. Nuestra
        aplicación está diseñada para proporcionarte una experiencia sin
        complicaciones y ayudarte a organizar tus visitas a la barbería de
        manera sencilla y rápida.
      </p>
      <h3>Mision:</h3>
      <p>
        Nuestra misión es ofrecerte un servicio de agendamiento de turnos que
        simplifique tu vida y te brinde la libertad de reservar citas de
        barbería en cualquier momento y desde cualquier lugar. Queremos que
        disfrutes de una experiencia de reserva sin estrés que se adapte a tu
        estilo de vida ocupado.
      </p>
    </div>
  );
}
