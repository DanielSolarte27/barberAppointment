import React from "react";
import styles from "./Contact.module.css";
export default function Contact() {
  return (
    <div className={styles.contact}>
      <h2>Contacto</h2>
      <div className={styles.contactForm}>
        <form>
          <input type="text" id="name" name="name" required placeholder="Nombre"/>
          <input type="email" id="email" name="email" required placeholder="Correo Electrónico"/>
          <textarea id="message" name="message" rows="4" required placeholder="Mensaje"></textarea>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}
