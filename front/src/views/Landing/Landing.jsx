import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>REAL GENTLEMAN</h1>
        <p>
          Estilo y precisión, tu corte perfecto en nuestra barbería y
          peluquería.
        </p>
        <div className={styles.linkContainer}>
          <Link to="/register" className={styles.button}>
            <span>Regístrate</span>
          </Link>
          <Link to="/login" className={styles.button}>
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
