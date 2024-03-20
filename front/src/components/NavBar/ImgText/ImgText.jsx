import React from "react";
import mario from "../../../assets/mario.jpg";
import styles from "./ImgText.module.css";

export default function ImgText() {
  return (
    <div className= { styles.imgtextContainer }>
        <img src={mario} alt="mario" />
        <p>¡Transforma tu look con nuestro corte de cabello personalizado! Nuestros estilistas expertos te ayudarán a encontrar el estilo perfecto para ti.</p>
    </div>
  );
}